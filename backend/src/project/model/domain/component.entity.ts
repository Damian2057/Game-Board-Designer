import { AbstractEntity } from "../../../database/abstract.entity";
import { Entity } from "typeorm";

@Entity()
export class ComponentEntity extends AbstractEntity<ComponentEntity> {

}