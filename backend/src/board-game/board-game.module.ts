import { Module } from '@nestjs/common';
import { BoardGameController } from './controller/board-game.controller';
import { BoardGameService } from './service/board-game.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Tag } from "./model/domain/tag.entity";
import { GameElement } from "./model/domain/game.element.entity";
import { BoardGame } from "./model/domain/board-game.entity";
import { TagController } from './controller/tag.controller';
import { TagService } from './service/tag.service';
import { AuthModule } from "../auth/auth.module";
import { UserModule } from "../users/user.module";
import { GameElementController } from "./controller/game.element.controller";
import { GameElementService } from "./service/game.element.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([BoardGame, Tag, GameElement]),
    AuthModule,
    UserModule
  ],
  controllers: [TagController, GameElementController, BoardGameController],
  providers: [BoardGameService, TagService, GameElementService],
})
export class BoardGameModule {}
