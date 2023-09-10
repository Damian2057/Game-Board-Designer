import { UpdateOrderCommand } from "./update.order.command";
import { UserDto } from "../../../users/model/dto/user.dto";
import { ProjectDto } from "../../../project/model/dto/project.dto";
import { OrderStatus } from "../domain/order.status.enum";

export class AdvancedUpdateOrderCommand extends UpdateOrderCommand {

  price: number;
  worker: UserDto;
  project: ProjectDto;
  status: OrderStatus;
}
