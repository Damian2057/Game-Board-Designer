import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany, ManyToOne,
  OneToMany,
  OneToOne
} from "typeorm";
import { AbstractEntity } from "../../../database/abstract.entity";
import { Container } from "./container.entity";
import { Box } from "./box.entity";
import { Length } from "class-validator";
import { Element } from "./element.entity";
import { Game } from "../../../game/model/domain/game.entity";
import { User } from "../../../users/model/domain/user.entity";

@Entity()
export class Project extends AbstractEntity<Project>{

  @Column({ length: 50 })
  @Length(3, 50)
  name: string;

  @Column({ length: 2000 })
  @Length(10, 2000)
  description: string;

  @Column('text', { array: true, nullable: true })
  notes: string[];

  @OneToOne(() => Box, {
    nullable: true
  })
  @JoinColumn()
  box: Box;

  @OneToMany(() => Container, container => container.project, {
    cascade: true,
    nullable: true
  })
  @JoinTable()
  containers: Container[];

  @OneToMany(() => Element, element => element.project, {
    cascade: true,
    nullable: true
  })
  @JoinTable()
  elements: Element[];

  @ManyToMany(() => Game, {
    cascade: true,
    nullable: true
  })
  @JoinTable()
  games: Game[];

  @ManyToOne(() => Game, { nullable: true })
  @JoinColumn()
  currentGame: Game;

  @Column({
    default: true
  })
  isTemplate: boolean;

  @Column('integer', { array: true, nullable: true })
  imageIds: number[];

  @Column({
    default: false
  })
  isCompleted: boolean;

  @ManyToOne(() => User, {
    nullable: true
  })
  @JoinColumn()
  user: User;
}