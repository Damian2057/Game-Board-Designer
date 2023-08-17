import { AbstractEntity } from "../../../database/abstract.entity";
import { Entity } from "typeorm";

@Entity()
export class ImageEntity extends AbstractEntity<ImageEntity> {

  filename: string
  originalName: string
}