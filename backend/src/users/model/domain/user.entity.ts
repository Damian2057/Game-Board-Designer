import { Column, Entity } from "typeorm";
import { AbstractEntity } from "../../../database/abstract.entity";
import { UserRoleEntity } from "./user.role.entity";

@Entity()
export class User extends AbstractEntity<User> {

  @Column({ length: 50 })
  username: string

  @Column({ length: 50 })
  password: string

  @Column({ length: 50 })
  email: string

  @Column({
    type: "enum",
    enum: UserRoleEntity,
    default: UserRoleEntity.USER
  }
  )
  role: UserRoleEntity
}
