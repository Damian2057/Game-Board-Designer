import { Injectable } from "@nestjs/common";
import { UpdateBoardGameElementCommand } from "../model/command/update.board-game-element.command";
import { CreateBoardGameElementCommand } from "../model/command/create.board-game.element.command";
import { ElementEntity } from "../model/domain/element.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { mapElementToElementDto } from "../util/util.functions";
import { SetFilter } from "../../util/SetFilter";
import { Game } from "../model/domain/game.entity";
import { IllegalArgumentException } from "../../exceptions/type/Illegal.argument.exception";
import { ElementDto } from "../model/dto/element.dto";

@Injectable()
export class ElementService {

  constructor(
    @InjectRepository(ElementEntity)
    private readonly gameElementRepository: Repository<ElementEntity>,
    @InjectRepository(Game)
    private readonly boardGameRepository: Repository<Game>
  ) {}

  async updateById(id: number, command: UpdateBoardGameElementCommand): Promise<ElementDto> {
    let element: ElementEntity = await this.gameElementRepository.findOneBy({id: id});
    if (!element) {
      throw new IllegalArgumentException(`Game element with id ${id} does not exist.`);
    }
    element = this.updateNotNullFields(command, element);
    const updated = await this.gameElementRepository.save(element);
    return mapElementToElementDto(updated);
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

  async findAll(): Promise<ElementDto[]> {
    const elements: ElementEntity[] = await this.gameElementRepository.find();
    return elements.map(element => mapElementToElementDto(element));
  }

  async find(id: number, name: string): Promise<ElementDto[]> {
    const elements = new SetFilter();
    if (name) {
      const result: ElementEntity = await this.gameElementRepository.findOneBy({name: name});
      if (result) {
        elements.add(result);
      }
    }
    if (id) {
      const result: ElementEntity = await this.gameElementRepository.findOneBy({id: id});
      if (result) {
        elements.add(result);
      }
    }
    return Array.from(elements.get()).map(element => mapElementToElementDto(element));
  }

  async findByBoardGame(id: number): Promise<ElementDto[]> {
    const game = await this.getGameBoardById(id);
    return game.gameElements.map(element => mapElementToElementDto(element));
  }

  private async getGameBoardById(id: number): Promise<Game> {
    const games: Game[] = await this.boardGameRepository.find({
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

  private updateNotNullFields(command: UpdateBoardGameElementCommand, element: ElementEntity) {
    if (command.name) {
      element.name = command.name;
    }
    if (command.quantity) {
      element.quantity = command.quantity;
    }
    return element;
  }
}