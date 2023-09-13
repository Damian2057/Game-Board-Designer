import {Entity} from "../entity";
import {Property} from "./property";
import {TicketEntity} from "./ticket.entity";

export interface Box extends Entity, TicketEntity {
    name: string;
    description: string;
    notes: string[];
    properties: Property[];
    imageIds: number[];
    type: string;
}