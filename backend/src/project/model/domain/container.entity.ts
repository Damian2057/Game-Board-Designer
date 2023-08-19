import { Column, Entity } from "typeorm";
import { Status } from "./status.enum";
import { Priority } from "./priority.enum";
import { AbstractTicketEntity } from "./abstract.ticket.entity";

@Entity()
export class Container extends AbstractTicketEntity<Container> {

  name: string;
  description: string;
  notes: string[];
  quantity: number;
  elements: Element[];

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