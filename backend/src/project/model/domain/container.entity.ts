import { AbstractEntity } from "../../../database/abstract.entity";
import { Entity } from "typeorm";

@Entity()
export class Container extends AbstractEntity<Container> {

  name: string;
  description: string;
  notes: string[];
  quantity: number;
  elements: Element[];
}