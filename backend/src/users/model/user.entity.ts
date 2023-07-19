import { Column, Entity } from "typeorm";
import { AbstractEntity } from "../../database/abstract.entity";

@Entity()
export class User extends AbstractEntity<User> {

  @Column({ length: 500 })
  name: string
}
