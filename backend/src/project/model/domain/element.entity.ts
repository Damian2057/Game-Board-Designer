import { Column, Entity, JoinTable, ManyToOne, OneToMany } from "typeorm";
import { Property } from "./property.entity";
import { AbstractTicketEntity } from "./abstract.ticket.entity";
import { Project } from "./project.entity";
import { Container } from "./container.entity";
import { Length, Min } from "class-validator";
import { NumericTransformer } from "../../../users/util/NumericTransformer";

@Entity()
export class Element extends AbstractTicketEntity<Element> {

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

  @OneToMany(() => Property, prop => prop.element, {
    nullable: true,
  })
  @JoinTable()
  properties: Property[];

  @ManyToOne(() => Project, project => project.elements, {
    onDelete: 'CASCADE',
  })
  project: Project

  @ManyToOne(() => Container, container => container.elements, {
    onDelete: 'CASCADE',
  })
  container: Container;

  @Column('integer', { array: true, nullable: true })
  imageIds: number[];

  @Column({
    default: 'element'
  })
  type: string;
}