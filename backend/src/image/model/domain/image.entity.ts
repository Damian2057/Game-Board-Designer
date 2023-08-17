import { AbstractEntity } from "../../../database/abstract.entity";
import { Column, Entity } from "typeorm";

@Entity()
export class ImageEntity extends AbstractEntity<ImageEntity> {

  @Column()
  filename: string

  @Column()
  mimetype: string

  constructor(filename: string, mimetype: string) {
    super();
    this.filename = filename;
    this.mimetype = mimetype;
  }
}