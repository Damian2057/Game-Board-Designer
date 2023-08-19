import { AbstractEntity } from "../../../database/abstract.entity";
import { Entity } from "typeorm";
import { Property } from "./property.entity";

@Entity()
export class Box extends AbstractEntity<Box> {

  name: string;
  description: string;
  notes: string[];
  properties: Property[];
}