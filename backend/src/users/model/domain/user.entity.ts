import { BeforeInsert, Column, Entity } from "typeorm";
import { AbstractEntity } from "../../../database/abstract.entity";
import { UserRoleEntity } from "./user.role.entity";
import {IsEmail, Length} from "class-validator";

@Entity()
export class User extends AbstractEntity<User> {

  @Column({ length: 50 })
  @Length(4, 50)
  username: string

  @Column()
  @Length(8)
  password: string

  @Column({
    length: 50,
    unique: true
  })
  @IsEmail()
  email: string

  @Column({ length: 9 })
  phoneNumber: string

  @Column({
    type: "enum",
    enum: UserRoleEntity,
    default: UserRoleEntity.USER
  })
  role: UserRoleEntity

  @BeforeInsert()
  emailToLowerCase() {
    this.email = this.email.toLowerCase();
  }
}
