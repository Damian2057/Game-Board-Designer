import { Controller, Post } from "@nestjs/common";
import { OrderService } from "../service/order.service";

@Controller('order/management')
export class OrderManagementController {

  constructor(
    private readonly orderService: OrderService,
  ) {
  }

  @Post('claim')
  async claimOrder() {

  }

}
