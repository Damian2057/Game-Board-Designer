import { Column, Entity, JoinTable, ManyToOne, OneToMany } from "typeorm";
import { Property } from "./property.entity";
import { AbstractTicketEntity } from "./abstract.ticket.entity";
import { Project } from "./project.entity";
import { Length } from "class-validator";

@Entity()
export class Box extends AbstractTicketEntity<Box> {

  @Column({ length: 50 })
  @Length(3, 50)
  name: string;

  @Column({ length: 2000 })
  @Length(10, 2000)
  description: string;

  @Column('text', { array: true, nullable: true })
  notes: string[];

  @OneToMany(() => Property, prop => prop.box, {
    cascade: true
  })
  @JoinTable()
  properties: Property[];

  @ManyToOne(() => Project, project => project.box)
  project: Project
}