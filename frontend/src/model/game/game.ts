import {Entity} from "../entity";
import {Tag} from "./tag";
import {Component} from "./component";

export interface Game extends Entity {

    title: string;
    description: string;
    publicationDate: string;
    price: number;
    tags: Tag[];
    components: Component[];
    imageIds: number[];
}