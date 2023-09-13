import { Column, Entity, JoinTable, ManyToMany, OneToMany } from "typeorm";
import { AbstractEntity } from "../../../database/abstract.entity";
import { Length, Min } from "class-validator";
import { NumericTransformer } from "../../../users/util/NumericTransformer";
import { Tag } from "./tag.entity";
import { Component } from "./component";

@Entity()
export class Game extends AbstractEntity<Game> {

  @Column({ length: 50 })
  @Length(3, 50)
  title: string

  @Column({ length: 2000 })
  @Length(10, 2000)
  description: string

  @Column({ length: 20 })
  @Length(6, 20)
  publicationDate: string

  @Min(0)
  @Column('numeric', {
    precision: 10,
    scale: 2,
    transformer: new NumericTransformer()
  })
  price: number

  @ManyToMany(() => Tag, tag => tag.game)
  @JoinTable()
  tags: Tag[]

  @OneToMany(() => Component, component => component.game)
  @JoinTable()
  components: Component[]

  @Column('integer', { array: true, nullable: true })
  imageIds: number[];
}