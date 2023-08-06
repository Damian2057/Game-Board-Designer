import { Module } from '@nestjs/common';
import { BoardGameController } from './controller/board-game.controller';
import { BoardGameService } from './service/board-game.service';

@Module({
  controllers: [BoardGameController],
  providers: [BoardGameService]
})
export class BoardGameModule {}
