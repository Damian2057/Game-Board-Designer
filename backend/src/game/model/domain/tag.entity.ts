import { Column, Entity, JoinTable, ManyToMany } from "typeorm";
import { AbstractEntity } from "../../../database/abstract.entity";
import { Game } from "./game.entity";

@Entity()
export class Tag extends AbstractEntity<Tag> {

    @Column({ length: 20,
        unique: true
    })
    name: string;

    @ManyToMany(() => Game, boardGame => boardGame.tags)
    @JoinTable()
    game: Game[]

}