import { AbstractEntity } from "../../../database/abstract.entity";
import { Column, Entity } from "typeorm";
import { IsEmail } from "class-validator";

@Entity()
export class CodeEntity extends AbstractEntity<CodeEntity> {

  constructor(code: string, email, date: string) {
    super();
    this.code = code;
    this.email = email;
    this.createdAt = date;
  }

  @Column()
  code: string;

  @Column({
    length: 50,
    unique: true
  })
  @IsEmail()
  email: string;

  @Column()
  createdAt: string;


}