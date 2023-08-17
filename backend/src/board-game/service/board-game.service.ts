import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BoardGame } from "../model/domain/board-game.entity";
import { Tag } from "../model/domain/tag.entity";
import { GameElement } from "../model/domain/game.element.entity";
import { CreateBoardGameCommand } from "../model/command/create.board-game.command";
import { UpdateBoardGameCommand } from "../model/command/update.board-game.command";
import { mapBoardGameToBoardGameDto } from "../util/util.functions";

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
    const boardGames: BoardGame[] = await this.boardGameRepository.find();
    return boardGames.map(boardGame => mapBoardGameToBoardGameDto(boardGame));
  }

  async findByFilter(id: number, name: string, tags: string) {
    return Promise.resolve([]);
  }

  async create(command: CreateBoardGameCommand) {
    return Promise.resolve(false);
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
}
