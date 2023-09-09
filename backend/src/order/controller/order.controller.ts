import { Controller, Get, Post, Put } from "@nestjs/common";
import { OrderService } from "../service/order.service";

@Controller('order')
export class OrderController {

  constructor(
    private readonly orderService: OrderService,
  ) {
  }

  @Post('submit')
  async submitOrder() {

  }

  @Get('my-orders')
  async getMyOrders() {

  }

  @Get('user-orders/:id')
  async getUserOrders() {

  }

  @Get('all-orders')
  async getAllOrders() {

  }

  @Get(':id')
  async getOrderById() {

  }

  @Put(':id')
  async updateOrder() {

  }
}
