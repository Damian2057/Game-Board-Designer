import { GameDto } from "../../../game/model/dto/game.dto";

export class OrderDto {
  id: number;
  phone: string;
  email: string;
  description: string;
  price: number;
  game: GameDto;
  address: string;
}