import { AbstractEntity } from "../../../database/abstract.entity";
import { Game } from "../../../game/model/domain/game.entity";
import { User } from "../../../users/model/domain/user.entity";

export class Order extends AbstractEntity<Order> {

  phone: string;
  email: string;
  description: string;
  price: number;
  game: Game;
  customer: User;
  worker: User;
}