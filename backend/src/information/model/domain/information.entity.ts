import { AbstractEntity } from "../../../database/abstract.entity";
import { Column, Entity } from "typeorm";
import { Length } from "class-validator";

@Entity()
export class Information extends AbstractEntity<Information> {

  @Column({ length: 100 })
  @Length(3, 100)
  address: string;

  @Column({ length: 20 })
  @Length(3, 20)
  phoneNumber: string;

  @Column({ length: 50 })
  @Length(3, 50)
  email: string;

  constructor(address: string, phoneNumber: string, email: string) {
    super();
    this.address = address;
    this.phoneNumber = phoneNumber;
    this.email = email;
  }
}