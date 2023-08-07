import { Module } from '@nestjs/common';
import { BoardGameController } from './controller/board-game.controller';
import { BoardGameService } from './service/board-game.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Tag } from "./model/domain/tag.entity";
import { Element } from "./model/domain/element.entity";
import { BoardGame } from "./model/domain/board-game.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([BoardGame, Tag, Element]),
  ],
  controllers: [BoardGameController],
  providers: [BoardGameService]
})
export class BoardGameModule {}
