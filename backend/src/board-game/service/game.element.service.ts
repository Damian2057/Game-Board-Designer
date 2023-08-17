import { Injectable } from "@nestjs/common";
import { UpdateBoardGameElementCommand } from "../model/command/update.board-game-element.command";
import { CreateBoardGameElementCommand } from "../model/command/create.board-game.element.command";

@Injectable()
export class GameElementService {

  async updateById(id: number, element: UpdateBoardGameElementCommand) {
    return Promise.resolve([]);
  }

  async deleteById(id: number) {
    return Promise.resolve([]);
  }

  async add(id: number, element: CreateBoardGameElementCommand) {
    return Promise.resolve([]);
  }

  async findAll() {
    return Promise.resolve([]);
  }

  async find(id: number, name: string) {
    return Promise.resolve(undefined);
  }

  findByBoardGame(id: number) {
    return Promise.resolve([]);
  }
}