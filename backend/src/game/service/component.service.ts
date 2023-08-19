import { Injectable } from "@nestjs/common";
import { UpdateComponentCommand } from "../model/command/update.component.command";
import { CreateComponentCommand } from "../model/command/create.component.command";
import { Component } from "../model/domain/component";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { mapComponentCommandToComponent, mapComponentToComponentDto, mapGameToGameDto } from "../util/util.functions";
import { SetFilter } from "../../util/SetFilter";
import { Game } from "../model/domain/game.entity";
import { IllegalArgumentException } from "../../exceptions/type/Illegal.argument.exception";
import { ComponentDto } from "../model/dto/component.dto";
import { GameDto } from "../model/dto/game.dto";

@Injectable()
export class ComponentService {

  constructor(
    @InjectRepository(Component)
    private readonly componentRepository: Repository<Component>,
    @InjectRepository(Game)
    private readonly boardGameRepository: Repository<Game>
  ) {}

  async updateById(id: number, command: UpdateComponentCommand): Promise<ComponentDto> {
    let element: Component = await this.componentRepository.findOneBy({id: id});
    if (!element) {
      throw new IllegalArgumentException(`Game element with id ${id} does not exist.`);
    }
    element = this.updateNotNullFields(command, element);
    const updated = await this.componentRepository.save(element);
    return mapComponentToComponentDto(updated);
  }

  async deleteById(id: number): Promise<boolean> {
    const result = await this.componentRepository.delete(id);
    if (result.affected > 0) {
      return true;
    }
    throw new IllegalArgumentException(`Game element with id ${id} does not exist.`);
  }

  async add(command: CreateComponentCommand, gameId: number): Promise<GameDto> {
    const game = await this.getGameBoardById(gameId);
    const component = mapComponentCommandToComponent(command, game);
    await this.componentRepository.save(component);
    const updatedGame = await this.getGameBoardById(gameId);
    return mapGameToGameDto(updatedGame);
  }

  async findAll(): Promise<ComponentDto[]> {
    const elements: Component[] = await this.componentRepository.find();
    return elements.map(element => mapComponentToComponentDto(element));
  }

  async find(id: number, name: string): Promise<ComponentDto[]> {
    const elements = new SetFilter();
    if (name) {
      const result: Component = await this.componentRepository.findOneBy({name: name});
      if (result) {
        elements.add(result);
      }
    }
    if (id) {
      const result: Component = await this.componentRepository.findOneBy({id: id});
      if (result) {
        elements.add(result);
      }
    }
    return Array.from(elements.get()).map(element => mapComponentToComponentDto(element));
  }

  async findByBoardGame(id: number): Promise<ComponentDto[]> {
    const game = await this.getGameBoardById(id);
    return game.components.map(element => mapComponentToComponentDto(element));
  }

  private async getGameBoardById(id: number): Promise<Game> {
    const games: Game[] = await this.boardGameRepository.find({
      relations: {
        tags: true,
        components: true
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

  private updateNotNullFields(command: UpdateComponentCommand, element: Component) {
    if (command.name) {
      element.name = command.name;
    }
    if (command.quantity) {
      element.quantity = command.quantity;
    }
    return element;
  }
}