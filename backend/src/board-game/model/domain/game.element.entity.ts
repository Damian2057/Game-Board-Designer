import { Entity, ManyToOne } from "typeorm";
import { AbstractEntity } from "../../../database/abstract.entity";
import { BoardGame } from "./board-game.entity";

@Entity()
export class GameElement extends AbstractEntity<GameElement> {

  name: string
  quantity: number
  @ManyToOne(() => BoardGame, boardGame => boardGame.gameElements)
  game: BoardGame
}