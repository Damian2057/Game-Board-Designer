import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { OrderService } from "../service/order.service";
import { GetCurrentUser } from "../../auth/decorator/current.user.decorator";

@Controller('order/management')
export class OrderManagementController {

  constructor(
    private readonly orderService: OrderService,
  ) {
  }

  @Post('claim/:id')
  async claimOrder(@GetCurrentUser() user, @Param('id') id: number) {
    return this.orderService.claimOrder(user, id);
  }

  @Get('my-orders')
  async getMyOrders(@GetCurrentUser() user) {
    return this.orderService.getMyOrdersWorker(user);
  }

  @Get(':id')
  async getOrderById(@Param('id') id: number) {
    return this.orderService.getOrderDtoById(id);
  }

  @Delete('cancel/:id')
  async cancelOrder(@Param('id') id: number) {
    return this.orderService.cancelOrder(id);
  }

  @Put('staff-update')
  async staffUpdateOrder(@Body() command) {
    return this.orderService.staffUpdateOrder(command);
  }

}
