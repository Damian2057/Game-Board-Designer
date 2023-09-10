import { GameDto } from "../../../game/model/dto/game.dto";
import { Length, Min } from "class-validator";

export class CreateOrderCommand {

  @Length(9, 15)
  phone: string;

  @Length(3, 100)
  email: string;

  @Length(0, 2000)
  description: string;

  @Min(0)
  price: number;

  @Length(3, 100)
  address: string;

  game: GameDto;
}