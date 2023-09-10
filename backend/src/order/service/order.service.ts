import { Injectable } from "@nestjs/common";
import { UpdateOrderCommand } from "../model/command/update.order.command";
import { InjectRepository } from "@nestjs/typeorm";
import { Order } from "../model/domain/order.entity";
import { Repository } from "typeorm";
import { CreateOrderCommand } from "../model/command/create.order.command";
import { User } from "../../users/model/domain/user.entity";
import { mapOrderCreateCommandToOrder, mapOrderToOrderDto } from "../util/util.functions";
import { OrderDto } from "../model/dto/order.dto";
import { AdvancedUpdateOrderCommand } from "../model/command/advanced.update.order.command";
import { Game } from "../../game/model/domain/game.entity";
import { GameService } from "../../game/service/game.service";
import { IllegalArgumentException } from "../../exceptions/type/Illegal.argument.exception";

@Injectable()
export class OrderService {

  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly gameService: GameService,
  ) {}

  async getOrderDtoById(id: any): Promise<OrderDto> {
    const order: Order = await this.getOrderById(id);
    return mapOrderToOrderDto(order);
  }

  async submitOrder(customer: User, command: CreateOrderCommand) {
    const order: Order = mapOrderCreateCommandToOrder(command);
    order.customer = customer;
    const game: Game = await this.gameService.getGameById(command.game.id);
    order.game = game;
    order.price = game.price;
    return mapOrderToOrderDto(await this.orderRepository.save(order));
  }

  async getMyOrders(customer: User): Promise<OrderDto[]> {
    return await this.getCustomerOrdersById(customer.id);
  }

  async getCustomerOrdersById(id: number) {
    const orders: Order[] = await this.orderRepository.find({
      relations: {
        game: true,
        customer: true,
        worker: true,
        project: true,
      },
      where: {
        customer: {
          id: id
        }
      }
    });
    return orders.map(order => mapOrderToOrderDto(order));
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

  async advanceUpdateOrder(command: AdvancedUpdateOrderCommand) {
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

  async getOrderById(id: number): Promise<Order> {
    const order: Order = await this.orderRepository.findOne({
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
    if (!order) {
      throw new IllegalArgumentException(`Order with id ${id} does not exist`)
    }

    return order;
  }
}
