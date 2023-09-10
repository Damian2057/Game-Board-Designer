import { GameDto } from "../../../game/model/dto/game.dto";

export class CreateOrderCommand {

  phone: string;
  email: string;
  description: string;
  price: number;
  address: string;
  game: GameDto;
}