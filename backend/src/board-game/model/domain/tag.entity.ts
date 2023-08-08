import { Column, Entity, JoinTable, ManyToMany } from "typeorm";
import { AbstractEntity } from "../../../database/abstract.entity";
import { BoardGame } from "./board-game.entity";

@Entity()
export class Tag extends AbstractEntity<Tag> {

    @Column({ length: 20 })
    name: string;

    @ManyToMany(() => BoardGame, boardGame => boardGame.tags)
    @JoinTable()
    game: BoardGame[]

}