import { Column, Entity } from "typeorm";
import { Property } from "./property.entity";
import { Status } from "./status.enum";
import { Priority } from "./priority.enum";
import { AbstractTicketEntity } from "./abstract.ticket.entity";

@Entity()
export class Box extends AbstractTicketEntity<Box> {

  name: string;
  description: string;
  notes: string[];
  properties: Property[];

  @Column({
    type: "enum",
    enum: Status,
    default: Status.TODO
  })
  status: Status

  @Column({
    type: "enum",
    enum: Priority,
    default: Priority.C
  })
  priority: Priority
}