import { Entity } from "typeorm";
import { AbstractEntity } from "../../../database/abstract.entity";

@Entity()
export class BoardGame extends AbstractEntity<BoardGame> {

}