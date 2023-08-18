import { Column, Entity, JoinTable, ManyToMany } from "typeorm";
import { AbstractEntity } from "../../../database/abstract.entity";
import { GameEntity } from "./game.entity";

@Entity()
export class Tag extends AbstractEntity<Tag> {

    @Column({ length: 20,
        unique: true
    })
    name: string;

    @ManyToMany(() => GameEntity, boardGame => boardGame.tags)
    @JoinTable()
    game: GameEntity[]

}