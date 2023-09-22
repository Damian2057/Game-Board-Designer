import { GameDto } from "../../../game/model/dto/game.dto";
import { Length } from "class-validator";

export class CreateOrderCommand {

  @Length(9, 15)
  phone: string;

  @Length(3, 100)
  email: string;

  @Length(0, 2000)
  description: string;

  @Length(3, 100)
  address: string;

  @Length(2, 50)
  firstName: string;

  @Length(2, 50)
  lastName: string;

  @Length(2, 50)
  city: string;

  game: GameDto;
}