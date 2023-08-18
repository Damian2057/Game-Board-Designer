import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { ElementService } from "../service/element.service";
import { UpdateBoardGameElementCommand } from "../model/command/update.board-game-element.command";
import { GameDto } from "../model/dto/game.dto";
import { HasRoles } from "../../auth/decorator/role.decorator";
import { UserRoleEntity } from "../../users/model/domain/user.role.entity";
import { JwtGuard } from "../../auth/guard/jwt.guard";
import { RolesGuard } from "../../auth/guard/roles.guard";
import { ElementDto } from "../model/dto/element.dto";
import { CreateBoardGameElementCommand } from "../model/command/create.board-game.element.command";

@Controller('element')
export class GameElementController {

  constructor(private readonly gameElementService: ElementService) {
  }

  @HasRoles(UserRoleEntity.EMPLOYEE, UserRoleEntity.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Put('update/:id')
  updateGameElement(@Param('id') id: number,
                    @Body() element: UpdateBoardGameElementCommand): Promise<ElementDto> {
    return this.gameElementService.updateById(id, element);
  }

  @Get('all/:id')
  getAllGameElementsByBoardGame(@Param('id') id: number): Promise<ElementDto[]> {
    return this.gameElementService.findByBoardGame(id);
  }

  @Get('/all')
  getAllGameElements(): Promise<ElementDto[]> {
    return this.gameElementService.findAll();
  }

  @HasRoles(UserRoleEntity.EMPLOYEE, UserRoleEntity.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Get('find')
  getGameElementByFilter(@Query('id') id?: number,
                         @Query('name') name?: string): Promise<ElementDto[]> {
    return this.gameElementService.find(id, name);
  }

  @HasRoles(UserRoleEntity.EMPLOYEE, UserRoleEntity.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Delete('delete/:id')
  deleteGameElement(@Param('id') id: number): Promise<boolean> {
    return this.gameElementService.deleteById(id);
  }

  @HasRoles(UserRoleEntity.EMPLOYEE, UserRoleEntity.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Post('create')
  addGameElement(@Body() element: CreateBoardGameElementCommand): Promise<boolean> {
    return this.gameElementService.add(element);
  }
}