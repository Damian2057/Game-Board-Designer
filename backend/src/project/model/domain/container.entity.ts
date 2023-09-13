import { Column, Entity, JoinTable, ManyToOne, OneToMany } from "typeorm";
import { AbstractTicketEntity } from "./abstract.ticket.entity";
import { Project } from "./project.entity";
import { Length, Min } from "class-validator";
import { NumericTransformer } from "../../../users/util/NumericTransformer";
import { Property } from "./property.entity";
import { Element } from "./element.entity";

@Entity()
export class Container extends AbstractTicketEntity<Container> {

  @Column({ length: 50 })
  @Length(3, 50)
  name: string;

  @Column({ length: 2000 })
  @Length(10, 2000)
  description: string;

  @Column('text', { array: true, nullable: true })
  notes: string[];

  @Min(0)
  @Column('numeric', {
    precision: 10,
    scale: 2,
    transformer: new NumericTransformer()
  })
  quantity: number;

  @OneToMany(() => Element, element => element.container)
  @JoinTable()
  elements: Element[];

  @OneToMany(() => Property, prop => prop.container)
  @JoinTable()
  properties: Property[];

  @ManyToOne(() => Project, project => project.containers, {
    onDelete: 'CASCADE',
  })
  project: Project

  @Column('integer', { array: true, nullable: true })
  imageIds: number[];

  @Column({
    default: 'container'
  })
  type: string;
}