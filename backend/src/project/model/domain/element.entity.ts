import { Column, Entity } from "typeorm";
import { Status } from "./status.enum";
import { Priority } from "./priority.enum";
import { Property } from "./property.entity";
import { AbstractTicketEntity } from "./abstract.ticket.entity";

@Entity()
export class Element extends AbstractTicketEntity<Element> {

  name: string;
  description: string;
  notes: string[];
  quantity: number;
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