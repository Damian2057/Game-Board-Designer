import { Entity } from "typeorm";
import { AbstractEntity } from "../../../database/abstract.entity";

@Entity()
export class Element extends AbstractEntity<Element> {

}