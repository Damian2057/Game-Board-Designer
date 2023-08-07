import { Controller } from '@nestjs/common';
import { BoardGameService } from "../service/board-game.service";

@Controller('board-game')
export class BoardGameController {
  constructor(private readonly boardGameService: BoardGameService) {}


}
