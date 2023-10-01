import { GameDto } from "../../../game/model/dto/game.dto";
import { UserDto } from "../../../users/model/dto/user.dto";
import { OrderStatus } from "../domain/order.status.enum";
import { ProjectDto } from "../../../project/model/dto/project.dto";

export class OrderDto {
  id: number;
  phone: string;
  email: string;
  description: string;
  price: number;
  game: GameDto;
  submittingDate: string;
  lastUpdate: string;
  city: string;
  address: string;
  customer: UserDto;
  worker: UserDto;
  status: OrderStatus;
  project: ProjectDto;
}