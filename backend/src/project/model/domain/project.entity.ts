import { Column, Entity, JoinTable, ManyToMany, OneToMany, OneToOne } from "typeorm";
import { AbstractEntity } from "../../../database/abstract.entity";
import { Container } from "./container.entity";
import { Box } from "./box.entity";
import { Length } from "class-validator";
import { Element } from "./element.entity";
import { Game } from "../../../game/model/domain/game.entity";

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

  @OneToMany(() => Box, box => box.project, {
    cascade: true
  })
  @JoinTable()
  box: Box;

  @OneToMany(() => Container, container => container.project, {
    cascade: true
  })
  @JoinTable()
  containers: Container[];

  @OneToMany(() => Element, element => element.project, {
    cascade: true
  })
  @JoinTable()
  elements: Element[];

  @ManyToMany(() => Game, {
    cascade: true,
    nullable: true
  })
  @JoinTable()
  games: Game[];

  @Column({
    default: true
  })
  isTemplate: boolean;
}