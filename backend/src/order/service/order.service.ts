import { Injectable } from "@nestjs/common";
import { UpdateOrderCommand } from "../model/command/update.order.command";
import { InjectRepository } from "@nestjs/typeorm";
import { Order } from "../model/domain/order.entity";
import { Repository } from "typeorm";
import { CreateOrderCommand } from "../model/command/create.order.command";
import { User } from "../../users/model/domain/user.entity";
import { mapOrderToOrderDto } from "../util/util.functions";

@Injectable()
export class OrderService {

  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async getOrderDtoById(id: any) {
    const order: Order = await this.getOrderById(id);
    return mapOrderToOrderDto(order);
  }

  async submitOrder(customer: User, command: CreateOrderCommand) {
    return Promise.resolve(undefined);
  }

  async getMyOrders(customer: User) {
    const orders: Order[] = await this.orderRepository.find({
      relations: {
        game: true,
        customer: true,
        worker: true,
        project: true,
      },
      where: {
        customer: {
          id: customer.id
        }
      }
    });
    return orders.map(order => mapOrderToOrderDto(order));
  }

  async getUserOrders(id: number) {
    return Promise.resolve(undefined);
  }

  async getAllOrders() {
    const orders: Order[] = await this.orderRepository.find({
      relations: {
        game: true,
        customer: true,
        worker: true,
        project: true,
      }
    });
    return orders.map(order => mapOrderToOrderDto(order));
  }

  async updateOrder(command: UpdateOrderCommand, id: number) {
    return Promise.resolve(undefined);
  }

  async claimOrder(worker: User, id: number) {
    const order: Order = await this.getOrderById(id);
    order.worker = worker;
    const updatedOrder: Order = await this.orderRepository.save(order);
    return mapOrderToOrderDto(updatedOrder);
  }

  async cancelOrder(id: number) {
    return Promise.resolve(undefined);
  }

  async staffUpdateOrder(command) {
    return Promise.resolve(undefined);
  }

  async getMyOrdersWorker(worker: User) {
    const orders: Order[] = await this.orderRepository.find({
      relations: {
        game: true,
        customer: true,
        worker: true,
        project: true,
      },
      where: {
        worker: {
          id: worker.id
        }
      }
    });
    return orders.map(order => mapOrderToOrderDto(order));
  }

  async getOrderById(id: any) {
    return await this.orderRepository.findOne({
      relations: {
        game: true,
        customer: true,
        worker: true,
        project: true,
      },
      where: {
        id: id
      }
    });
  }
}
