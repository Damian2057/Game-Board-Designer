import { Injectable } from "@nestjs/common";
import { UpdateBoardGameElementCommand } from "../model/command/update.board-game-element.command";
import { CreateBoardGameElementCommand } from "../model/command/create.board-game.element.command";

@Injectable()
export class GameElementService {

  async updateById(id: number, elementId: number, element: UpdateBoardGameElementCommand) {
    return Promise.resolve([]);
  }

  async deleteById(id: number, elementId: number) {
    return Promise.resolve([]);
  }

  async add(id: number, element: CreateBoardGameElementCommand) {
    return Promise.resolve([]);
  }

  async findAll(id: number) {
    return Promise.resolve([]);
  }

  async findByFilter(id: number) {
    return Promise.resolve(undefined);
  }
}