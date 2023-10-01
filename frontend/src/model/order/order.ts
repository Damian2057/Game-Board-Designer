import {Entity} from "../entity";
import {Game} from "../game/game";
import {User} from "../user/user";

export interface Order extends Entity {

    phone: string;
    email: string;
    description: string;
    price: number;
    city: string;
    game: Game;
    submittingDate: string;
    lastUpdate: string;
    address: string;
    customer: User;
    worker?: User;
    status: string;
}