import { Module } from '@nestjs/common';
import { ImageController } from './controller/image.controller';
import { MulterModule } from "@nestjs/platform-express";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BoardGame } from "../board-game/model/domain/board-game.entity";
import { Tag } from "../board-game/model/domain/tag.entity";
import { GameElement } from "../board-game/model/domain/game.element.entity";
import { AuthModule } from "../auth/auth.module";
import { UserModule } from "../users/user.module";
import { ImageService } from './service/image.service';
import { ImageScheduler } from './scheduler/image.scheduler';
import * as process from "process";
import { ScheduleModule } from "@nestjs/schedule";
import { ImageEntity } from "./model/domain/image.entity";

@Module({
  imports: [
    MulterModule.registerAsync({
      useFactory: () => ({
        dest: process.env.MULTER_STORAGE_PATH,
      }),
    }),
    ScheduleModule.forRoot(),
    TypeOrmModule.forFeature([ImageEntity, BoardGame, Tag, GameElement]),
    AuthModule,
    UserModule
  ],
  controllers: [ImageController],
  providers: [ImageService, ImageScheduler],
  exports: [ImageService]
})
export class ImageModule {}
