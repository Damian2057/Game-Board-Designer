import { Injectable } from "@nestjs/common";
import { UpdateBoardGameElementCommand } from "../model/command/update.board-game-element.command";

@Injectable()
export class GameElementService {

  updateById(id: number, elementId: number, element: UpdateBoardGameElementCommand) {
    return Promise.resolve([]);
  }

  deleteById(id: number, elementId: number) {
    return Promise.resolve([]);
  }

  add(id: number, element: UpdateBoardGameElementCommand) {
    return Promise.resolve([]);
  }

  findAll(id: number) {
    return Promise.resolve([]);
  }

  findByFilter(id: number) {
    return Promise.resolve(undefined);
  }
}