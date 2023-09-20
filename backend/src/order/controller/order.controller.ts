import { Body, Controller, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { OrderService } from "../service/order.service";
import { GetCurrentUser } from "../../auth/decorator/current.user.decorator";
import { UpdateOrderCommand } from "../model/command/update.order.command";
import { CreateOrderCommand } from "../model/command/create.order.command";
import { OrderDto } from "../model/dto/order.dto";
import { HasRoles } from "../../auth/decorator/role.decorator";
import { UserRole } from "../../users/model/domain/user.role.enum";
import { JwtGuard } from "../../auth/guard/jwt.guard";
import { RolesGuard } from "../../auth/guard/roles.guard";
import { OrderMemberShip } from "../guards/OrderMemberShip";

@Controller('order')
export class OrderController {

  constructor(
    private readonly orderService: OrderService,
  ) {}

  @UseGuards(JwtGuard)
  @Post('submit')
  async submitOrder(@GetCurrentUser() user, @Body() command: CreateOrderCommand): Promise<OrderDto> {
    return this.orderService.submitOrder(user, command);
  }

  @UseGuards(JwtGuard)
  @Get('my-orders')
  async getMyOrders(@GetCurrentUser() user): Promise<OrderDto[]> {
    return this.orderService.getMyOrders(user);
  }

  @HasRoles(UserRole.ADMIN, UserRole.EMPLOYEE)
  @UseGuards(JwtGuard, RolesGuard)
  @Get('all-orders')
  async getAllOrders(): Promise<OrderDto[]> {
    return this.orderService.getAllOrders();
  }

  @HasRoles(UserRole.USER, UserRole.ADMIN, UserRole.EMPLOYEE)
  @UseGuards(JwtGuard, RolesGuard, OrderMemberShip)
  @Put(':id')
  async updateOrder(@Body() command: UpdateOrderCommand, @Param('id') id: number): Promise<OrderDto> {
    return this.orderService.updateOrder(command, id);
  }

  @Get('trending-games')
  async getTrendingGames(): Promise<any[]> {
    return this.orderService.getTrendingGames();
  }
}
