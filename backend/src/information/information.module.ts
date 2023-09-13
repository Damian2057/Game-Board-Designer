import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "../auth/auth.module";
import { UserModule } from "../users/user.module";
import { InformationController } from './controller/information.controller';
import { InformationService } from './service/information.service';
import { Information } from "./model/domain/information.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Information]),
    AuthModule,
    UserModule,
  ],
  controllers: [InformationController],
  providers: [InformationService],
})
export class InformationModule {}
