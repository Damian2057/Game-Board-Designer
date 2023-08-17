import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BoardGame } from "../model/domain/board-game.entity";
import { Tag } from "../model/domain/tag.entity";
import { GameElement } from "../model/domain/game.element.entity";
import { CreateBoardGameCommand } from "../model/command/create.board-game.command";
import { UpdateBoardGameCommand } from "../model/command/update.board-game.command";
import { mapBoardGameToBoardGameDto } from "../util/util.functions";
import { SetFilter } from "../../util/SetFilter";
import { DuplicateKeyParameterException } from "../../exceptions/type/duplicate.key.parameter.exception";
import { IllegalArgumentException } from "../../exceptions/type/Illegal.argument.exception";
import { BoardGameDto } from "../model/dto/board-game.dto";

@Injectable()
export class BoardGameService {

  constructor(
    @InjectRepository(BoardGame)
    private readonly boardGameRepository: Repository<BoardGame>,
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
    @InjectRepository(GameElement)
    private readonly gameElementRepository: Repository<GameElement>
  ) {}


  async findAll(): Promise<BoardGameDto[]> {
    const boardGames: BoardGame[] = await this.boardGameRepository.find({
      relations: {
        tags: true,
        gameElements: true
      },
    });
    return boardGames.map(boardGame => mapBoardGameToBoardGameDto(boardGame));
  }

  async findByFilter(id: number, title: string, tags: string) {
    const games = new SetFilter();
    if (id) {
      const result: BoardGame = await this.getGameBoardById(id);
      if (result != null) {
        games.add(result);
      }
    }
    if (title) {
      const result: BoardGame[] = await this.boardGameRepository.find({
        relations: {
          tags: true,
          gameElements: true
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
        const results: BoardGame[] = await this.boardGameRepository.find({
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
          const gameWithFullProperties: BoardGame = await this.getGameBoardById(result.id);
          games.add(gameWithFullProperties);
        }
      }
    }
    return Array.from(games.get()).map(game => mapBoardGameToBoardGameDto(game));
  }

  async create(command: CreateBoardGameCommand): Promise<boolean> {
    if (await this.boardGameRepository.findOneBy({title: command.title}) == null) {
      if (!command.publicationDate) {
        command.publicationDate = new Date().toISOString().slice(0, 10);
      }
      await this.boardGameRepository.save(command);
      return true;
    }
    throw new DuplicateKeyParameterException('Board Game with title: ' + command.title + ' already exists!');
  }

  async updateById(id: number, command: UpdateBoardGameCommand): Promise<BoardGameDto> {
    let game: BoardGame = await this.getGameBoardById(id);
    game = this.updateNotNullFields(game, command);
    const updated: BoardGame = await this.boardGameRepository.save(game);
    return mapBoardGameToBoardGameDto(updated);
  }

  async deleteById(id: number): Promise<boolean> {
    const result = await this.getGameBoardById(id);
    result.gameElements.forEach(element => {
      this.gameElementRepository.delete(element);
    });
    await this.boardGameRepository.delete(id);
    return true;
  }

  async removeTagFromGameById(id: number, tagId: number): Promise<BoardGameDto> {
    const tag: Tag = await this.getTagById(tagId);
    const game: BoardGame = await this.getGameBoardById(id);
    const existingTagIndex = game.tags.findIndex(t => t.id === tag.id);

    if (existingTagIndex !== -1) {
      game.tags.splice(existingTagIndex, 1);
      await this.boardGameRepository.save(game);
      return mapBoardGameToBoardGameDto(game);
    }
    throw new IllegalArgumentException('Tag with id: ' + tagId + ' does not exist for the game!');
  }

  async addTagToGameById(id: number, tagId: number): Promise<BoardGameDto> {
    const tag: Tag = await this.getTagById(tagId);
    const game: BoardGame = await this.getGameBoardById(id);
    const existingTagIndex = game.tags.findIndex(t => t.id === tag.id);

    if (existingTagIndex === -1) {
      game.tags.push(tag);
      await this.boardGameRepository.save(game);
      return mapBoardGameToBoardGameDto(game);
    }
    throw new IllegalArgumentException('Tag with id: ' + tagId + ' already exists for the game!');
  }

  async addGameElementToGameById(id: number, gameElementId: number): Promise<BoardGameDto> {
    const gameElement: GameElement = await this.getGameElementById(gameElementId);
    const game: BoardGame = await this.getGameBoardById(id);
    await this.checkIfGameElementIsNotAlreadyUsed(gameElement);
    const existingGameElementIndex = game.gameElements.findIndex(t => t.id === gameElement.id);

    if (existingGameElementIndex === -1) {
      game.gameElements.push(gameElement);
      await this.boardGameRepository.save(game);
      return mapBoardGameToBoardGameDto(game);
    }
    throw new IllegalArgumentException('GameElement with id: ' + gameElementId + ' already exists for the game!');
  }

  async removeGameElementFromGameById(id: number, gameElementId: number): Promise<BoardGameDto> {
    const gameElement: GameElement = await this.getGameElementById(gameElementId);
    const game: BoardGame = await this.getGameBoardById(id);
    const existingGameElementIndex = game.gameElements.findIndex(t => t.id === gameElement.id);

    if (existingGameElementIndex !== -1) {
      game.gameElements.splice(existingGameElementIndex, 1);
      await this.boardGameRepository.save(game);
      return mapBoardGameToBoardGameDto(game);
    }
    throw new IllegalArgumentException('GameElement with id: ' + gameElementId + ' does not exist for the game!');
  }

  private async getGameBoardById(id: number): Promise<BoardGame> {
    const games: BoardGame[] = await this.boardGameRepository.find({
      relations: {
        tags: true,
        gameElements: true
      },
      where: {
        id: id
      }
    });
    if (games.length === 0) {
      throw new IllegalArgumentException('BoardGame with id: ' + id + ' does not exist!')
    }
    return games[0]
  }

  private async getTagById(id: number): Promise<Tag> {
    const tag: Tag = await this.tagRepository.findOneBy({id: id});
    if (!tag) {
      throw new IllegalArgumentException('Tag with id: ' + id + ' does not exist!');
    }
    return tag;
  }

  private updateNotNullFields(boardGame: BoardGame, command: UpdateBoardGameCommand): BoardGame {
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
    return boardGame;
  }

  private async getGameElementById(id: number): Promise<GameElement> {
    const gameElement: GameElement = await this.gameElementRepository.findOneBy({id: id});
    if (!gameElement) {
      throw new IllegalArgumentException('GameElement with id: ' + id + ' does not exist!');
    }
    return gameElement;
  }

  private async checkIfGameElementIsNotAlreadyUsed(gameElement: GameElement) {
    const games: BoardGame[] = await this.boardGameRepository.find({
      relations: {
        tags: true,
        gameElements: true
      },
      where: {
        gameElements: {
          id: gameElement.id
        }
      }
    });
    if (games.length > 0) {
      throw new IllegalArgumentException('GameElement with id: ' + gameElement.id + ' is already used by the game with id: ' + games[0].id);
    }
  }
}
