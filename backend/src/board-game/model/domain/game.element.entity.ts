import { Column, Entity, ManyToOne } from "typeorm";
import { AbstractEntity } from "../../../database/abstract.entity";
import { BoardGame } from "./board-game.entity";
import { Length, Min } from "class-validator";
import { NumericTransformer } from "../../../users/util/NumericTransformer";

@Entity()
export class GameElement extends AbstractEntity<GameElement> {

  @Column({ length: 100 })
  @Length(3, 100)
  name: string

  @Min(0)
  @Column('numeric', {
    precision: 10,
    scale: 2,
    transformer: new NumericTransformer()
  })
  quantity: number

  @ManyToOne(() => BoardGame, boardGame => boardGame.gameElements)
  game: BoardGame
}