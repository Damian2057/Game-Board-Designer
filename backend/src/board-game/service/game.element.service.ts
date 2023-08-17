import { Injectable } from "@nestjs/common";
import { UpdateBoardGameElementCommand } from "../model/command/update.board-game-element.command";
import { CreateBoardGameElementCommand } from "../model/command/create.board-game.element.command";
import { GameElement } from "../model/domain/game.element.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { mapGameElementToGameElementDto } from "../util/util.functions";
import { SetFilter } from "../../util/SetFilter";
import { BoardGame } from "../model/domain/board-game.entity";
import { IllegalArgumentException } from "../../exceptions/type/Illegal.argument.exception";
import { GameElementDto } from "../model/dto/game-element.dto";

@Injectable()
export class GameElementService {

  constructor(
    @InjectRepository(GameElement)
    private readonly gameElementRepository: Repository<GameElement>,
    @InjectRepository(BoardGame)
    private readonly boardGameRepository: Repository<BoardGame>
  ) {}

  async updateById(id: number, command: UpdateBoardGameElementCommand): Promise<GameElementDto> {
    let element: GameElement = await this.gameElementRepository.findOneBy({id: id});
    if (!element) {
      throw new IllegalArgumentException(`Game element with id ${id} does not exist.`);
    }
    element = this.updateNotNullFields(command, element);
    const updated = await this.gameElementRepository.save(element);
    return mapGameElementToGameElementDto(updated);
  }

  async deleteById(id: number): Promise<boolean> {
    const result = await this.gameElementRepository.delete(id);
    if (result.affected > 0) {
      return true;
    }
    throw new IllegalArgumentException(`Game element with id ${id} does not exist.`);
  }

  async add(command: CreateBoardGameElementCommand) {
    await this.gameElementRepository.save(command);
    return true;
  }

  async findAll(): Promise<GameElementDto[]> {
    const elements: GameElement[] = await this.gameElementRepository.find();
    return elements.map(element => mapGameElementToGameElementDto(element));
  }

  async find(id: number, name: string): Promise<GameElementDto[]> {
    const elements = new SetFilter();
    if (name) {
      const result: GameElement = await this.gameElementRepository.findOneBy({name: name});
      if (result) {
        elements.add(result);
      }
    }
    if (id) {
      const result: GameElement = await this.gameElementRepository.findOneBy({id: id});
      if (result) {
        elements.add(result);
      }
    }
    return Array.from(elements.get()).map(element => mapGameElementToGameElementDto(element));
  }

  async findByBoardGame(id: number): Promise<GameElementDto[]> {
    const game = await this.getGameBoardById(id);
    return game.gameElements.map(element => mapGameElementToGameElementDto(element));
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
      throw new IllegalArgumentException(`BoardGame with id: ${id} does not exist!`);
    }
    return games[0];
  }

  private updateNotNullFields(command: UpdateBoardGameElementCommand, element: GameElement) {
    if (command.name) {
      element.name = command.name;
    }
    if (command.quantity) {
      element.quantity = command.quantity;
    }
    return element;
  }
}