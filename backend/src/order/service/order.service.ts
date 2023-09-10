import { Injectable } from '@nestjs/common';
import { UpdateOrderCommand } from "../model/command/update.order.command";

@Injectable()
export class OrderService {

  async getOrderById(id: any) {
    return undefined;
  }

  submitOrder(user) {
    return Promise.resolve(undefined);
  }

  getMyOrders(user) {
    return Promise.resolve(undefined);
  }

  getUserOrders(id: number) {
    return Promise.resolve(undefined);
  }

  getAllOrders() {
    return Promise.resolve(undefined);
  }

  updateOrder(command: UpdateOrderCommand, id: number) {
    return Promise.resolve(undefined);
  }

  claimOrder(user) {
    return Promise.resolve(undefined);
  }

  cancelOrder(id: number) {
    return Promise.resolve(undefined);
  }

  staffUpdateOrder(command) {
    return Promise.resolve(undefined);
  }
}
