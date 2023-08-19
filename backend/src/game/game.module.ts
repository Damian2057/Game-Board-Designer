import { Module } from '@nestjs/common';
import { GameController } from './controller/game.controller';
import { GameService } from './service/game.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Tag } from "./model/domain/tag.entity";
import { Component } from "./model/domain/component";
import { Game } from "./model/domain/game.entity";
import { TagController } from './controller/tag.controller';
import { TagService } from './service/tag.service';
import { AuthModule } from "../auth/auth.module";
import { UserModule } from "../users/user.module";
import { ComponentController } from "./controller/component.controller";
import { ComponentService } from "./service/component.service";
import { ImageModule } from "../image/image.module";
import { ImageEntity } from "../image/model/domain/image.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Game, Tag, Component, ImageEntity]),
    AuthModule,
    UserModule,
    ImageModule
  ],
  controllers: [TagController, ComponentController, GameController],
  providers: [GameService, TagService, ComponentService],
})
export class GameModule {}
