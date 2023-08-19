import { AbstractEntity } from "../../../database/abstract.entity";

export class Container extends AbstractEntity<Container> {

  name: string;
  description: string;
  notes: string[];
  quantity: number;
}