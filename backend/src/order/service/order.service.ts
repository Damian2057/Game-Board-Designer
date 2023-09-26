import { Injectable } from "@nestjs/common";
import { UpdateOrderCommand } from "../model/command/update.order.command";
import { InjectRepository } from "@nestjs/typeorm";
import { Order } from "../model/domain/order.entity";
import { Repository } from "typeorm";
import { CreateOrderCommand } from "../model/command/create.order.command";
import { User } from "../../users/model/domain/user.entity";
import {
  getRandomElements,
  mapOrderCreateCommandToOrder,
  mapOrderToOrderDto
} from "../util/util.functions";
import { OrderDto } from "../model/dto/order.dto";
import { AdvancedUpdateOrderCommand } from "../model/command/advanced.update.order.command";
import { Game } from "../../game/model/domain/game.entity";
import { GameService } from "../../game/service/game.service";
import { IllegalArgumentException } from "../../exceptions/type/Illegal.argument.exception";
import { OrderStatus } from "../model/domain/order.status.enum";
import { UserService } from "../../users/service/user.service";
import { GameDto } from "../../game/model/dto/game.dto";
import { mapGameToGameDto } from "../../game/util/util.functions";

@Injectable()
export class OrderService {

  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly gameService: GameService,
    private readonly userService: UserService,
  ) {}

  async getOrderDtoById(id: number): Promise<OrderDto> {
    const order: Order = await this.getOrderById(id);
    return mapOrderToOrderDto(order);
  }

  async submitOrder(customer: User, command: CreateOrderCommand): Promise<OrderDto> {
    const order: Order = mapOrderCreateCommandToOrder(command);
    order.customer = customer;
    const game: Game = await this.gameService.getGameById(command.game.id);
    order.game = game;
    order.price = game.price;
    order.currency = game.currency;
    return mapOrderToOrderDto(await this.orderRepository.save(order));
  }

  async getMyOrders(customer: User): Promise<OrderDto[]> {
    return await this.getCustomerOrdersById(customer.id);
  }

  async getCustomerOrdersById(id: number): Promise<OrderDto[]> {
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

  async getWorkerOrdersById(id: number): Promise<OrderDto[]> {
    const orders: Order[] = await this.orderRepository.find({
      relations: {
        game: true,
        customer: true,
        worker: true,
        project: true,
      },
      where: {
        worker: {
          id: id
        }
      }
    });
    return orders.map(order => mapOrderToOrderDto(order));
  }

  async getAllOrders(): Promise<OrderDto[]> {
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

  async claimOrder(worker: User, id: number): Promise<OrderDto> {
    const order: Order = await this.getOrderById(id);
    order.worker = worker;
    const updatedOrder: Order = await this.orderRepository.save(order);
    return mapOrderToOrderDto(updatedOrder);
  }

  async updateOrder(command: UpdateOrderCommand, id: number): Promise<OrderDto> {
    const order: Order = await this.getOrderById(id);
    if (order.status !== OrderStatus.PENDING && order.status !== OrderStatus.CLAIMED) {
      throw new IllegalArgumentException(`Order with id ${id} cannot be updated because it is already claimed.`);
    }
    const updatedOrder: Order = await this.updateNotNullFields(order, command);
    return mapOrderToOrderDto(await this.orderRepository.save(updatedOrder));
  }

  async cancelOrder(id: number): Promise<OrderDto> {
    const order: Order = await this.getOrderById(id);
    order.status = OrderStatus.CANCELLED;
    const updatedOrder: Order = await this.orderRepository.save(order);
    return mapOrderToOrderDto(updatedOrder);
  }

  async advanceUpdateOrder(command: AdvancedUpdateOrderCommand, id: number): Promise<OrderDto> {
    const order: Order = await this.getOrderById(id);
    const updatedOrder: Order = await this.updateNotNullFields(order, command);
    return mapOrderToOrderDto(await this.orderRepository.save(updatedOrder));
  }

  async getMyOrdersWorker(worker: User): Promise<OrderDto[]> {
    return await this.getWorkerOrdersById(worker.id);
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

  getAvailableOrdersStatuses(): OrderStatus[] {
    return Object.values(OrderStatus);
  }

  async getTrendingGames(): Promise<any[]> {
    let games: any[] = await this.orderRepository.createQueryBuilder("order")
      .select("order.game", "game")
      .addSelect("COUNT(order.game)", "count")
      .groupBy("order.game")
      .orderBy("count", "DESC")
      .limit(3)
      .getRawMany();

    if (games.length === 0 || games.length < 3) {
      games = getRandomElements(await this.gameService.findAll(),3);
    }

    return games;
  }

  private async updateNotNullFields(order: Order, command: any): Promise<Order> {
    if (command.address) {
      order.address = command.address;
    }
    if (command.description) {
      order.description = command.description;
    }
    if (command.email) {
      order.email = command.email;
    }
    if (command.phone) {
      order.phone = command.phone;
    }
    if (command.price) {
      order.price = command.price;
    }
    if (command.worker) {
      order.worker = await this.userService.findOne(command.worker.id);
    }
    if (command.city) {
      order.city = command.city;
    }
    if (command.status) {
      order.status = command.status;
    }
    if (command.city) {
      order.city = command.city;
    }
    if (command.firstName) {
      order.firstName = command.firstName;
    }
    if (command.lastName) {
      order.lastName = command.lastName;
    }
    if (command.currency) {
      order.currency = command.currency;
    }
    return order;
  }
}
