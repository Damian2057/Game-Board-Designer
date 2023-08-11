import { Column, Entity, ManyToOne } from "typeorm";
import { AbstractEntity } from "../../../database/abstract.entity";
import { BoardGame } from "./board-game.entity";
import { Length, Min } from "class-validator";

@Entity()
export class GameElement extends AbstractEntity<GameElement> {

  @Column({ length: 100 })
  @Length(3, 100)
  name: string

  @Min(1)
  quantity: number

  @ManyToOne(() => BoardGame, boardGame => boardGame.gameElements)
  game: BoardGame
}