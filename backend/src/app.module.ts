import { Module } from '@nestjs/common';
import { UserModule } from './users/user.module';
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from './auth/auth.module';
import { GameModule } from './game/game.module';
import { ProjectModule } from './project/project.module';
import { DatabaseModule } from './database/database.module';
import { ExceptionsModule } from './exceptions/exceptions.module';
import { OrderModule } from './order/order.module';
import { ImageModule } from './image/image.module';
import { BullModule } from "@nestjs/bull";
import * as process from "process";

@Module({
  imports: [ConfigModule.forRoot(),
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT),
      },
    }),
    UserModule,
    AuthModule,
    GameModule,
    ProjectModule,
    DatabaseModule,
    ExceptionsModule,
    OrderModule,
    ImageModule],
  controllers: [],
  providers: []
})
export class AppModule {}