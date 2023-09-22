import { AbstractEntity } from "../../../database/abstract.entity";
import { Game } from "../../../game/model/domain/game.entity";
import { User } from "../../../users/model/domain/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { IsString, Length, Min } from "class-validator";
import { NumericTransformer } from "../../../users/util/NumericTransformer";
import { OrderStatus } from "./order.status.enum";
import { Project } from "../../../project/model/domain/project.entity";

@Entity()
export class Order extends AbstractEntity<Order> {

  @Column({ length: 20 })
  @Length(3, 20)
  phone: string;

  @Column({ length: 20 })
  @Length(3, 20)
  email: string;

  @Column({ length: 2000 })
  @Length(3, 2000)
  description: string;

  @Min(0)
  @Column('numeric', {
    precision: 10,
    scale: 2,
    transformer: new NumericTransformer()
  })
  price: number;

  @Column({ length: 200 })
  @Length(3, 200)
  address: string;

  @Column({ length: 50 })
  @Length(2, 50)
  firstName: string;

  @Column({ length: 50 })
  @Length(2, 50)
  lastName: string;

  @Column({ length: 50 })
  @Length(2, 50)
  city: string;

  @Column({ length: 20, nullable: true })
  @Length(2, 20)
  currency: string;

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
    enum: OrderStatus,
    default: OrderStatus.PENDING
  })
  status: OrderStatus;

  @OneToOne(() => Project, (project) => project.order)
  @JoinColumn()
  project: Project;
}