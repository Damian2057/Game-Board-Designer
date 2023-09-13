import { CanActivate, ExecutionContext, forwardRef, Inject, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { ROLES } from "../../auth/util/const";
import { User } from "../../users/model/domain/user.entity";
import { Reflector } from "@nestjs/core";
import { UserService } from "../../users/service/user.service";
import { UpdateOrderCommand } from "../model/command/update.order.command";
import { OrderService } from "../service/order.service";
import { Order } from "../model/domain/order.entity";

@Injectable()
export class OrderMemberShip implements CanActivate {

  constructor(
    private reflector: Reflector,
    private readonly userService: UserService,
    private readonly orderService: OrderService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const params = request.params;

    const order: Order = await this.orderService.getOrderById(params.id);

    return this.isOrderOwner(request.user, order);
  }

  private isOrderOwner(user, order: Order) {
    return user.id === order.customer.id;

  }
}
