import { Column, Entity, ManyToOne } from "typeorm";
import { AbstractEntity } from "../../../database/abstract.entity";
import { Game } from "./game";
import { Length, Min } from "class-validator";
import { NumericTransformer } from "../../../users/util/NumericTransformer";

@Entity()
export class Element extends AbstractEntity<Element> {

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

  @ManyToOne(() => Game, boardGame => boardGame.gameElements)
  game: Game
}