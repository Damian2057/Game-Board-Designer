import {Entity} from "../entity";
import {Property} from "./property";
import {TicketEntity} from "./ticket.entity";

export interface ElementEntity extends Entity, TicketEntity {
    name: string;
    description: string;
    notes: string[];
    quantity: number;
    properties: Property[];
    imageIds: number[];
    type: string;
}