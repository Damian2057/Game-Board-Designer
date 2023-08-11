import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./model/domain/user.entity";
import { AuthModule } from "../auth/auth.module";
import { HelloController } from "./controller/hello.controller";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    AuthModule
  ],
  controllers: [UserController, HelloController],
  providers: [
    UserService,
  ],
  exports: [
    UserService
  ]
})
export class UserModule {}
