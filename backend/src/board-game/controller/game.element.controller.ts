import { Body, Controller, Delete, Get, Param, Put, UseGuards } from "@nestjs/common";
import { GameElementService } from "../service/game.element.service";
import { UpdateBoardGameElementCommand } from "../model/command/update.board-game-element.command";
import { BoardGameDto } from "../model/dto/board-game.dto";
import { HasRoles } from "../../auth/decorator/role.decorator";
import { UserRoleEntity } from "../../users/model/domain/user.role.entity";
import { JwtGuard } from "../../auth/guard/jwt.guard";
import { RolesGuard } from "../../auth/guard/roles.guard";
import { GameElementDto } from "../model/dto/game-element.dto";

@Controller('element')
export class GameElementController {

  constructor(private readonly gameElementService: GameElementService) {
  }

  @HasRoles(UserRoleEntity.EMPLOYEE, UserRoleEntity.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Put(':id/update/:elementId')
  updateGameElement(@Param('id') id: number, @Param('elementId') elementId: number, @Body() element: UpdateBoardGameElementCommand): Promise<BoardGameDto[]> {
    return this.gameElementService.updateById(id, elementId, element);
  }

  @Get(':id/all')
  getAllGameElements(@Param('id') id: number): Promise<GameElementDto[]> {
    return this.gameElementService.findAll(id);
  }

  @HasRoles(UserRoleEntity.EMPLOYEE, UserRoleEntity.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Get(':id/find')
  getGameElementByFilter(@Param('id') id: number): Promise<GameElementDto> {
    return this.gameElementService.findByFilter(id);
  }

  @HasRoles(UserRoleEntity.EMPLOYEE, UserRoleEntity.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Delete(':id/delete/:elementId')
  deleteGameElement(@Param('id') id: number, @Param('elementId') elementId: number): Promise<BoardGameDto[]> {
    return this.gameElementService.deleteById(id, elementId);
  }

  @HasRoles(UserRoleEntity.EMPLOYEE, UserRoleEntity.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Put(':id/add')
  addGameElement(@Param('id') id: number, @Body() element: UpdateBoardGameElementCommand): Promise<BoardGameDto[]> {
    return this.gameElementService.add(id, element);
  }
}