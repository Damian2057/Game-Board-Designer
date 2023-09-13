import { AbstractEntity } from "../../../database/abstract.entity";
import { Column } from "typeorm";
import { Status } from "./status.enum";
import { Priority } from "./priority.enum";

export abstract class AbstractTicketEntity<T> extends AbstractEntity<T> {

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