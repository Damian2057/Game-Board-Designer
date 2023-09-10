import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Game } from "../model/domain/game.entity";
import { Tag } from "../model/domain/tag.entity";
import { Component } from "../model/domain/component";
import { CreateGameCommand } from "../model/command/create.game.command";
import { UpdateGameCommand } from "../model/command/update.game.command";
import { mapGameToGameDto } from "../util/util.functions";
import { SetFilter } from "../../util/SetFilter";
import { DuplicateKeyParameterException } from "../../exceptions/type/duplicate.key.parameter.exception";
import { IllegalArgumentException } from "../../exceptions/type/Illegal.argument.exception";
import { GameDto } from "../model/dto/game.dto";
import { ImageEntity } from "../../image/model/domain/image.entity";
import { ImageDownloadException } from "../../exceptions/type/image.download.exception";
import { Result } from "../../util/pojo/Result";

@Injectable()
export class GameService {

  constructor(
    @InjectRepository(Game)
    private readonly boardGameRepository: Repository<Game>,
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
    @InjectRepository(Component)
    private readonly componentRepository: Repository<Component>,
    @InjectRepository(ImageEntity)
    private readonly imageRepository: Repository<ImageEntity>,
  ) {}


  async findAll(): Promise<GameDto[]> {
    const boardGames: Game[] = await this.boardGameRepository.find({
      relations: {
        tags: true,
        components: true
      },
    });
    return boardGames.map(boardGame => mapGameToGameDto(boardGame));
  }

  async findByFilter(id: number, title: string, tags: string) {
    const games = new SetFilter();
    if (id) {
      const result: Game = await this.getGameBoardById(id);
      if (result != null) {
        games.add(result);
      }
    }
    if (title) {
      const result: Game[] = await this.boardGameRepository.find({
        relations: {
          tags: true,
          components: true
        },
        where: {
          title: title
        }
      });
      if (result != null) {
        games.add(result[0]);
      }
    }
    if (tags) {
      const tagNames: string[] = tags.split(',');
      for (const tagName of tagNames) {
        const results: Game[] = await this.boardGameRepository.find({
          relations: {
            tags: true,
          },
          where: {
            tags: {
              name: tagName
            }
          }
        });
        for (const result of results) {
          const gameWithFullProperties: Game = await this.getGameBoardById(result.id);
          games.add(gameWithFullProperties);
        }
      }
    }
    return Array.from(games.get()).map(game => mapGameToGameDto(game));
  }

  async create(command: CreateGameCommand): Promise<GameDto> {
    if (await this.boardGameRepository.findOneBy({title: command.title}) == null) {
      try {
        if (!command.publicationDate) {
          command.publicationDate = new Date().toISOString().slice(0, 10);
        }
        await this.checkImageExists(command.imageIds);
        const game: Game = await this.boardGameRepository.save(command);
        await this.componentRepository.save(game.components);
        return mapGameToGameDto(await this.boardGameRepository.save(game));
      } catch (e) {
        throw new IllegalArgumentException(e.message);
      }
    }
    throw new DuplicateKeyParameterException('Board Game with title: ' + command.title + ' already exists!');
  }

  async updateById(id: number, command: UpdateGameCommand): Promise<GameDto> {
    let game: Game = await this.getGameBoardById(id);
    game = this.updateNotNullFields(game, command);
    const updated: Game = await this.boardGameRepository.save(game);
    return mapGameToGameDto(updated);
  }

  async deleteById(id: number): Promise<Result> {
    const res = await this.boardGameRepository.delete(id);
    if (res.affected > 0) {
      return new Result(res);
    }
    throw new IllegalArgumentException(`Game with id: ${id} does not exist!`)
  }

  async removeTagFromGameById(id: number, tagId: number): Promise<GameDto> {
    const tag: Tag = await this.getTagById(tagId);
    const game: Game = await this.getGameBoardById(id);
    const existingTagIndex = game.tags.findIndex(t => t.id === tag.id);

    if (existingTagIndex !== -1) {
      game.tags.splice(existingTagIndex, 1);
      await this.boardGameRepository.save(game);
      return mapGameToGameDto(game);
    }
    throw new IllegalArgumentException('Tag with id: ' + tagId + ' does not exist for the game!');
  }

  async addTagToGameById(id: number, tagId: number): Promise<GameDto> {
    const tag: Tag = await this.getTagById(tagId);
    const game: Game = await this.getGameBoardById(id);
    const existingTagIndex = game.tags.findIndex(t => t.id === tag.id);

    if (existingTagIndex === -1) {
      game.tags.push(tag);
      await this.boardGameRepository.save(game);
      return mapGameToGameDto(game);
    }
    throw new IllegalArgumentException('Tag with id: ' + tagId + ' already exists for the game!');
  }

  async addComponentToGameById(id: number, gameElementId: number): Promise<GameDto> {
    const gameElement: Component = await this.getGameElementById(gameElementId);
    const game: Game = await this.getGameBoardById(id);
    await this.checkIfGameElementIsNotAlreadyUsed(gameElement);
    const existingGameElementIndex = game.components.findIndex(t => t.id === gameElement.id);

    if (existingGameElementIndex === -1) {
      game.components.push(gameElement);
      await this.boardGameRepository.save(game);
      return mapGameToGameDto(game);
    }
    throw new IllegalArgumentException('GameElement with id: ' + gameElementId + ' already exists for the game!');
  }

  async removeComponentFromGameById(id: number, gameElementId: number): Promise<GameDto> {
    const gameElement: Component = await this.getGameElementById(gameElementId);
    const game: Game = await this.getGameBoardById(id);
    const existingGameElementIndex = game.components.findIndex(t => t.id === gameElement.id);

    if (existingGameElementIndex !== -1) {
      game.components.splice(existingGameElementIndex, 1);
      await this.boardGameRepository.save(game);
      return mapGameToGameDto(game);
    }
    throw new IllegalArgumentException('GameElement with id: ' + gameElementId + ' does not exist for the game!');
  }

  async getGameBoardById(id: number): Promise<Game> {
    const game: Game = await this.boardGameRepository.findOne({
      relations: {
        tags: true,
        components: true
      },
      where: {
        id: id
      }
    });
    if (!game) {
      throw new IllegalArgumentException('BoardGame with id: ' + id + ' does not exist!')
    }
    return game
  }

  private async getTagById(id: number): Promise<Tag> {
    const tag: Tag = await this.tagRepository.findOneBy({id: id});
    if (!tag) {
      throw new IllegalArgumentException('Tag with id: ' + id + ' does not exist!');
    }
    return tag;
  }

  private updateNotNullFields(boardGame: Game, command: UpdateGameCommand): Game {
    if (command.title) {
      boardGame.title = command.title;
    }
    if (command.description) {
      boardGame.description = command.description;
    }
    if (command.publicationDate) {
      boardGame.publicationDate = command.publicationDate;
    }
    if (command.price) {
      boardGame.price = command.price;
    }
    if (command.imageIds) {
      boardGame.imageIds = command.imageIds;
    }
    return boardGame;
  }

  private async getGameElementById(id: number): Promise<Component> {
    const gameElement: Component = await this.componentRepository.findOneBy({id: id});
    if (!gameElement) {
      throw new IllegalArgumentException('GameElement with id: ' + id + ' does not exist!');
    }
    return gameElement;
  }

  private async checkIfGameElementIsNotAlreadyUsed(gameElement: Component) {
    const games: Game[] = await this.boardGameRepository.find({
      relations: {
        tags: true,
        components: true
      },
      where: {
        components: {
          id: gameElement.id
        }
      }
    });
    if (games.length > 0) {
      throw new IllegalArgumentException('GameElement with id: ' + gameElement.id + ' is already used by the game with id: ' + games[0].id);
    }
  }

  private async checkImageExists(imageIds: number[]): Promise<void> {
    for (const id of imageIds) {
      const file: ImageEntity = await this.imageRepository.findOneBy({ id: id });
      if (!file) {
        throw new ImageDownloadException(`The file with the id ${id} does not exist.`);
      }
    }
  }

  async findById(id: number): Promise<GameDto> {
    const game: Game = await this.getGameBoardById(id);
    return mapGameToGameDto(game);
  }
}
