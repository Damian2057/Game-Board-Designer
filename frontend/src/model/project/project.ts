import {Entity} from "../entity";
import {Game} from "../game/game";
import {Order} from "../order/order";
import {User} from "../user/user";
import {ElementEntity} from "./elementEntity";
import {Box} from "./box";
import {ContainerEntity} from "./containerEntity";

export interface Project extends Entity {

    name: string;
    description: string;
    notes: string[];
    box: Box;
    containers: ContainerEntity[];
    elements: ElementEntity[];
    games: Game[];
    currentGame?: Game;
    isTemplate: boolean;
    imageIds: number[];
    isCompleted: boolean;
    user?: User;
    order?: Order;
}