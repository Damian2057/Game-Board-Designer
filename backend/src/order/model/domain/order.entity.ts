import { AbstractEntity } from "../../../database/abstract.entity";
import { Game } from "../../../game/model/domain/game.entity";
import { User } from "../../../users/model/domain/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { IsString, Length, Min } from "class-validator";
import { NumericTransformer } from "../../../users/util/NumericTransformer";
import { OrderStatusEnum } from "./order.status.enum";
import { Project } from "../../../project/model/domain/project.entity";

@Entity()
export class Order extends AbstractEntity<Order> {

  @Column({ length: 20 })
  @Length(3, 20)
  phone: string;

  @Column({ length: 20 })
  @Length(3, 20)
  email: string;

  @IsString()
  @Length(3, 2000)
  description: string;

  @Min(0)
  @Column('numeric', {
    precision: 10,
    scale: 2,
    transformer: new NumericTransformer()
  })
  price: number;

  @ManyToOne(() => Game, { nullable: false })
  @JoinColumn()
  game: Game;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn()
  customer: User;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn()
  worker: User;

  @Column({
    type: "enum",
    enum: OrderStatusEnum,
    default: OrderStatusEnum.PENDING
  })
  status: OrderStatusEnum;

  @OneToOne(() => Project, (project) => project.order)
  @JoinColumn()
  project: Project;
}