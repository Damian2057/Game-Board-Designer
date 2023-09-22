import { UpdateOrderCommand } from "./update.order.command";
import { UserDto } from "../../../users/model/dto/user.dto";
import { OrderStatus } from "../domain/order.status.enum";

export class AdvancedUpdateOrderCommand extends UpdateOrderCommand {

  price: number;
  worker: UserDto;
  status: OrderStatus;
  firstName: string;
  lastName: string;
  currency: string;
}
