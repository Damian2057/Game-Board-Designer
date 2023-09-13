import {Entity} from "../entity";

export interface Component extends Entity {
    name: string;
    quantity: number;
}