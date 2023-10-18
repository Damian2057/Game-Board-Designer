import { GameDto } from "../../../../game/model/dto/game.dto";
import { OrderDto } from "../../../../order/model/dto/order.dto";

export class UpdateProjectCommand {
  name: string;
  description: string;
  notes: string[];
  games: GameDto[];
  imageIds: number[];
  order: OrderDto;
  isTemplate: boolean;
  isCompleted: boolean;
}