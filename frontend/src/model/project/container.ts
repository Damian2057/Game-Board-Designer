import {Entity} from "../entity";
import {Property} from "./property";
import {Element} from "./element";
import {TicketEntity} from "./ticket.entity";

export interface Container extends Entity, TicketEntity {
    name: string;
    description: string;
    notes: string[];
    quantity: number;
    elements: Element[];
    properties: Property[];
    imageIds: number[];
    type: string;
}