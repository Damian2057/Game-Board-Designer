import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { OrderService } from "../service/order.service";
import { GetCurrentUser } from "../../auth/decorator/current.user.decorator";
import { OrderDto } from "../model/dto/order.dto";
import { AdvancedUpdateOrderCommand } from "../model/command/advanced.update.order.command";
import { HasRoles } from "../../auth/decorator/role.decorator";
import { UserRole } from "../../users/model/domain/user.role.enum";
import { JwtGuard } from "../../auth/guard/jwt.guard";
import { RolesGuard } from "../../auth/guard/roles.guard";

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

  @HasRoles(UserRole.ADMIN, UserRole.EMPLOYEE)
  @UseGuards(JwtGuard, RolesGuard)
  @Get('orders-customer/:id')
  async getCustomerOrders(@Param('id') id: number): Promise<OrderDto[]> {
    return this.orderService.getCustomerOrdersById(id);
  }

  @HasRoles(UserRole.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Get('orders-worker/:id')
  async getWorkerOrders(@Param('id') id: number): Promise<OrderDto[]> {
    return this.orderService.getWorkerOrdersById(id);
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
