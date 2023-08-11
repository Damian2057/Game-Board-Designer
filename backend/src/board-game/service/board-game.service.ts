import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BoardGame } from "../model/domain/board-game.entity";
import { Tag } from "../model/domain/tag.entity";
import { GameElement } from "../model/domain/game.element.entity";
import { CreateBoardGameCommand } from "../model/command/create.board-game.command";
import { UpdateBoardGameCommand } from "../model/command/update.board-game.command";

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


  findAll() {
    return Promise.resolve([]);
  }

  findByFilter(id: number, name: string, tags: string) {
    return Promise.resolve([]);
  }

  create(command: CreateBoardGameCommand) {
    return Promise.resolve(false);
  }

  updateById(id: number, command: UpdateBoardGameCommand) {
    return Promise.resolve(undefined);
  }

  deleteById(id: number) {
    return Promise.resolve(false);
  }
}
