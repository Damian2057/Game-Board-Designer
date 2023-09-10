import { Injectable } from '@nestjs/common';
import { UpdateOrderCommand } from "../model/command/update.order.command";
import { InjectRepository } from "@nestjs/typeorm";
import { Order } from "../model/domain/order.entity";
import { Repository } from "typeorm";
import { CreateOrderCommand } from "../model/command/create.order.command";
import { User } from "../../users/model/domain/user.entity";

@Injectable()
export class OrderService {

  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async getOrderById(id: any) {
    const order: Order = await this.orderRepository.findOne({
      relations: {
        game: true,
        customer: true,
        worker: true,
        project: true,
      },
      where: {
        id: id
      }});
    return order;
  }

  async submitOrder(customer: User, command: CreateOrderCommand) {
    return Promise.resolve(undefined);
  }

  async getMyOrders(customer: User) {
    return this.orderRepository.find({
      relations: {

      }
    });
    return Promise.resolve(undefined);
  }

  async getUserOrders(id: number) {
    return Promise.resolve(undefined);
  }

  async getAllOrders() {
    return Promise.resolve(undefined);
  }

  async updateOrder(command: UpdateOrderCommand, id: number) {
    return Promise.resolve(undefined);
  }

  async claimOrder(user) {
    return Promise.resolve(undefined);
  }

  async cancelOrder(id: number) {
    return Promise.resolve(undefined);
  }

  async staffUpdateOrder(command) {
    return Promise.resolve(undefined);
  }

  getMyOrdersWorker(user) {
    return Promise.resolve(undefined);
  }
}
