import {Entity} from "../entity";
import {Property} from "./property";
import {ElementEntity} from "./elementEntity";
import {TicketEntity} from "./ticket.entity";

export interface ContainerEntity extends Entity, TicketEntity {
    name: string;
    description: string;
    notes: string[];
    quantity: number;
    elements: ElementEntity[];
    properties: Property[];
    imageIds: number[];
    type: string;
}