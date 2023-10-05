import {Entity} from "../entity";
import {Game} from "../game/game";
import {Order} from "../order/order";
import {User} from "../user/user";
import {Element} from "./element";
import {Box} from "./box";
import {ContainerEntity} from "./containerEntity";

export interface Project extends Entity {

    name: string;
    description: string;
    notes: string[];
    box: Box;
    containers: ContainerEntity[];
    elements: Element[];
    games: Game[];
    currentGame?: Game;
    isTemplate: boolean;
    imageIds: number[];
    isCompleted: boolean;
    user?: User;
    order?: Order;
}