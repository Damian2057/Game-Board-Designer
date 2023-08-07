import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BoardGame } from "../model/domain/board-game.entity";
import { Tag } from "../model/domain/tag.entity";
import { GameElement } from "../model/domain/game.element.entity";

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


}
