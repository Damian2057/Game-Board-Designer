import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./model/domain/user.entity";
import { AuthModule } from "../auth/auth.module";
import { BullModule } from "@nestjs/bull";
import { CODE_SEND_EMAIL } from "../util/bullMQ/queue";
import { CodeActivatorConsumer } from "./service/consumer/code.activator.consumer";
import { CodeEntity } from "./model/domain/code.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([User, CodeEntity]),
    AuthModule,
    BullModule.registerQueue({
      name: CODE_SEND_EMAIL
    }),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    CodeActivatorConsumer
  ],
  exports: [
    UserService
  ]
})
export class UserModule {}
