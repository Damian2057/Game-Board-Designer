import { Body, Controller, Delete, Get, Param, Put, Query, UseGuards } from "@nestjs/common";
import { GameElementService } from "../service/game.element.service";
import { UpdateBoardGameElementCommand } from "../model/command/update.board-game-element.command";
import { BoardGameDto } from "../model/dto/board-game.dto";
import { HasRoles } from "../../auth/decorator/role.decorator";
import { UserRoleEntity } from "../../users/model/domain/user.role.entity";
import { JwtGuard } from "../../auth/guard/jwt.guard";
import { RolesGuard } from "../../auth/guard/roles.guard";
import { GameElementDto } from "../model/dto/game-element.dto";
import { CreateBoardGameElementCommand } from "../model/command/create.board-game.element.command";

@Controller('element')
export class GameElementController {

  constructor(private readonly gameElementService: GameElementService) {
  }

  @HasRoles(UserRoleEntity.EMPLOYEE, UserRoleEntity.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Put('update/:id')
  updateGameElement(@Param('id') id: number,
                    @Body() element: UpdateBoardGameElementCommand): Promise<BoardGameDto[]> {
    return this.gameElementService.updateById(id, element);
  }

  @Get('all/:id')
  getAllGameElementsByBoardGame(@Param('id') id: number): Promise<GameElementDto[]> {
    return this.gameElementService.findByBoardGame(id);
  }

  @Get('/all')
  getAllGameElements(): Promise<GameElementDto[]> {
    return this.gameElementService.findAll();
  }

  @HasRoles(UserRoleEntity.EMPLOYEE, UserRoleEntity.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Get('find')
  getGameElementByFilter(@Query('id') id?: number,
                         @Query('name') name?: string): Promise<GameElementDto> {
    return this.gameElementService.find(id, name);
  }

  @HasRoles(UserRoleEntity.EMPLOYEE, UserRoleEntity.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Delete('delete/:id')
  deleteGameElement(@Param('id') id: number): Promise<BoardGameDto[]> {
    return this.gameElementService.deleteById(id);
  }

  @HasRoles(UserRoleEntity.EMPLOYEE, UserRoleEntity.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Put('create/:id')
  addGameElement(@Param('id') id: number,
                 @Body() element: CreateBoardGameElementCommand): Promise<BoardGameDto[]> {
    return this.gameElementService.add(id, element);
  }
}