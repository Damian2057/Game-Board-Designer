import { Order } from "../model/domain/order.entity";
import { OrderDto } from "../model/dto/order.dto";

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
    orderDto.customer = order.customer;
  }
  if (order.worker) {
    orderDto.worker = order.worker;
  }
  if (order.project) {
    orderDto.project = order.project;
  }
  return orderDto;
}