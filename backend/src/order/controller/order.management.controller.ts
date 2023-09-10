import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { OrderService } from "../service/order.service";
import { GetCurrentUser } from "../../auth/decorator/current.user.decorator";
import { OrderDto } from "../model/dto/order.dto";
import { AdvancedUpdateOrderCommand } from "../model/command/advanced.update.order.command";

@Controller('order/management')
export class OrderManagementController {

  constructor(
    private readonly orderService: OrderService,
  ) {}

  @Post('claim/:id')
  async claimOrder(@GetCurrentUser() user, @Param('id') id: number): Promise<OrderDto> {
    return this.orderService.claimOrder(user, id);
  }

  @Get('my-orders')
  async getMyOrders(@GetCurrentUser() worker): Promise<OrderDto[]> {
    return this.orderService.getMyOrdersWorker(worker);
  }

  @Get(':id')
  async getOrderById(@Param('id') id: number): Promise<OrderDto> {
    return this.orderService.getOrderDtoById(id);
  }

  @Delete('cancel/:id')
  async cancelOrder(@Param('id') id: number): Promise<OrderDto> {
    return this.orderService.cancelOrder(id);
  }

  @Put('advance-update')
  async advanceUpdateOrder(@Body() command: AdvancedUpdateOrderCommand): Promise<OrderDto> {
    return this.orderService.advanceUpdateOrder(command);
  }

}
