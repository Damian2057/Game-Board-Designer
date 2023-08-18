import { Module } from '@nestjs/common';
import { GameController } from './controller/game.controller';
import { GameService } from './service/game.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Tag } from "./model/domain/tag.entity";
import { Element } from "./model/domain/element";
import { Game } from "./model/domain/game";
import { TagController } from './controller/tag.controller';
import { TagService } from './service/tag.service';
import { AuthModule } from "../auth/auth.module";
import { UserModule } from "../users/user.module";
import { GameElementController } from "./controller/game.element.controller";
import { ElementService } from "./service/element.service";
import { ImageModule } from "../image/image.module";
import { ImageEntity } from "../image/model/domain/image.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Game, Tag, Element, ImageEntity]),
    AuthModule,
    UserModule,
    ImageModule
  ],
  controllers: [TagController, GameElementController, GameController],
  providers: [GameService, TagService, ElementService],
})
export class GameModule {}
