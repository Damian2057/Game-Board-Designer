import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { OrderService } from "../service/order.service";
import { GetCurrentUser } from "../../auth/decorator/current.user.decorator";
import { UpdateOrderCommand } from "../model/command/update.order.command";
import { CreateOrderCommand } from "../model/command/create.order.command";

@Controller('order')
export class OrderController {

  constructor(
    private readonly orderService: OrderService,
  ) {}

  @Post('submit')
  async submitOrder(@GetCurrentUser() user, @Body() command: CreateOrderCommand) {
    return this.orderService.submitOrder(user, command);
  }

  @Get('my-orders')
  async getMyOrders(@GetCurrentUser() user) {
    return this.orderService.getMyOrders(user);
  }

  @Get('user-orders/:id')
  async getUserOrders(@Param('id') id: number) {
    return this.orderService.getUserOrders(id);
  }

  @Get('all-orders')
  async getAllOrders() {
    return this.orderService.getAllOrders();
  }

  @Put(':id')
  async updateOrder(@Body() command: UpdateOrderCommand, @Param('id') id: number) {
    return this.orderService.updateOrder(command, id);
  }
}
