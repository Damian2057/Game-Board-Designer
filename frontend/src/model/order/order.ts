import {Entity} from "../entity";
import {Game} from "../game/game";
import {User} from "../user/user";

export interface Order extends Entity {

    phone: string;
    email: string;
    description: string;
    price: number;
    game?: Game;
    address: string;
    customer?: User;
    worker?: User;
    status: string;
}