import { AbstractEntity } from "../../../database/abstract.entity";
import { Column, Entity, ManyToOne } from "typeorm";
import { Box } from "./box.entity";
import { Container } from "./container.entity";
import { Element } from "./element.entity";
import { Length } from "class-validator";

@Entity()
export class Property extends AbstractEntity<Property> {

    @Column({ length: 50 })
    @Length(3, 50)
    name: string;

    @Column({ length: 50 })
    @Length(1, 50)
    value: string;

    @ManyToOne(() => Box, box => box.properties, {
        onDelete: 'CASCADE',
    })
    box: Box;

    @ManyToOne(() => Container, container => container.properties, {
        onDelete: 'CASCADE',
    })
    container: Container;

    @ManyToOne(() => Element, element => element.properties, {
        onDelete: 'CASCADE',
    })
    element: Element;

    constructor(name: string, value: string) {
        super();
        this.name = name;
        this.value = value;
    }
}