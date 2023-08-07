import { Module } from '@nestjs/common';
import { OrderController } from './controller/order.controller';
import { OrderService } from './service/order.service';
import { OrderManagementController } from './controller/order.management.controller';

@Module({

  controllers: [OrderController, OrderManagementController],

  providers: [OrderService]
})
export class OrderModule {}
