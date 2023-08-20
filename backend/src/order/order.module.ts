import { Module } from '@nestjs/common';
import { OrderController } from './controller/order.controller';
import { OrderService } from './service/order.service';
import { OrderManagementController } from './controller/order.management.controller';
import { AuthModule } from "../auth/auth.module";
import { UserModule } from "../users/user.module";
import { GameModule } from "../game/game.module";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    TypeOrmModule.forFeature([]),
    AuthModule,
    UserModule,
    GameModule
  ],
  controllers: [OrderController, OrderManagementController],

  providers: [OrderService]
})
export class OrderModule {}
