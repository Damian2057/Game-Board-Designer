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


  async findAll() {
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
    if (id != null) {
      const result: BoardGame[] = await this.getNewGameElementId(id);
      if (result != null) {
        games.add(result[0]);
      }
    }
    if (title != null) {
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
    if (tags != null) {
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
          const gamesWithFullProperties: BoardGame[] = await this.getNewGameElementId(result.id);
          games.add(gamesWithFullProperties[0]);
        }
      }
    }
    return Array.from(games.get()).map(game => mapBoardGameToBoardGameDto(game));
  }

  async create(command: CreateBoardGameCommand) {
    if (await this.boardGameRepository.findOneBy({title: command.title}) == null) {
      await this.boardGameRepository.save(command);
      return true;
    }
    throw new DuplicateKeyParameterException('Board Game with title: ' + command.title + ' already exists!');
  }

  async updateById(id: number, command: UpdateBoardGameCommand) {
    return Promise.resolve(undefined);
  }

  async deleteById(id: number) {
    return Promise.resolve(false);
  }

  deleteGameTagById(id: number, tagId: number) {
    return Promise.resolve([]);
  }

  addGameTagById(id: number, tagId: number) {
    return Promise.resolve([]);
  }

  private async getNewGameElementId(id: number): Promise<BoardGame[]> {
    return await this.boardGameRepository.find({
      relations: {
        tags: true,
        gameElements: true
      },
      where: {
        id: id
      }
    });
  }
}
