import { Order } from "../model/domain/order.entity";
import { OrderDto } from "../model/dto/order.dto";
import { CreateOrderCommand } from "../model/command/create.order.command";
import { mapUserToUserDto } from "../../users/util/util.functions";
import { mapProjectToProjectDto } from "../../project/util/util.functions";

export function mapOrderToOrderDto(order: Order) {
  const orderDto = new OrderDto();
  orderDto.id = order.id;
  orderDto.phone = order.phone;
  orderDto.email = order.email;
  orderDto.description = order.description;
  orderDto.price = order.price;
  orderDto.address = order.address;
  orderDto.game = order.game;
  orderDto.status = order.status;
  if (order.customer) {
    orderDto.customer = mapUserToUserDto(order.customer);
  }
  if (order.worker) {
    orderDto.worker = mapUserToUserDto(order.worker);
  }
  if (order.project) {
    orderDto.project = mapProjectToProjectDto(order.project)
  }
  return orderDto;
}

export function mapOrderCreateCommandToOrder(command: CreateOrderCommand): Order {
  const order = new Order();
  order.phone = command.phone;
  order.email = command.email;
  order.description = command.description;
  order.address = command.address;
  order.firstName = command.firstName;
  order.lastName = command.lastName;
  order.city = command.city;
  return order;
}

export function getRandomElements<T>(list: T[], n: number): T[] {
  if (n >= list.length) {
    return list.slice();
  }
  const shuffledList = list.slice();
  for (let i = shuffledList.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledList[i], shuffledList[j]] = [shuffledList[j], shuffledList[i]];
  }
  return shuffledList.slice(0, n);
}