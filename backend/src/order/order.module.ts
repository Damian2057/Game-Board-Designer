import { Module } from '@nestjs/common';
import { OrderController } from './controller/order.controller';
import { OrderService } from './service/order.service';
import { OrderManagementController } from './controller/order.management.controller';
import { AuthModule } from "../auth/auth.module";
import { UserModule } from "../users/user.module";
import { GameModule } from "../game/game.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Order } from "./model/domain/order.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    AuthModule,
    UserModule,
    GameModule
  ],
  controllers: [OrderController, OrderManagementController],
  providers: [OrderService],
  exports: [OrderService]
})
export class OrderModule {}
