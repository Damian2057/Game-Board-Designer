import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { GameService } from "../service/game.service";
import { HasRoles } from "../../auth/decorator/role.decorator";
import { UserRoleEntity } from "../../users/model/domain/user.role.entity";
import { JwtGuard } from "../../auth/guard/jwt.guard";
import { RolesGuard } from "../../auth/guard/roles.guard";
import { GameDto } from "../model/dto/game.dto";
import { CreateBoardGameCommand } from "../model/command/create.board-game.command";
import { UpdateBoardGameCommand } from "../model/command/update.board-game.command";

@Controller('game')
export class GameController {

  constructor(private readonly boardGameService: GameService) {}

  @Get('all')
  getAllBoardGames(): Promise<GameDto[]> {
    return this.boardGameService.findAll();
  }

  @Get('find')
  getGameBoardByFilter(@Query('id') id?: number,
             @Query('title') title?: string,
             @Query('tags') tags?: string): Promise<GameDto[]> {
    return this.boardGameService.findByFilter(id, title, tags);
  }

  @HasRoles(UserRoleEntity.EMPLOYEE, UserRoleEntity.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Post('create')
  createBoardGame(@Body() command: CreateBoardGameCommand): Promise<boolean> {
    return this.boardGameService.create(command);
  }

  @HasRoles(UserRoleEntity.EMPLOYEE, UserRoleEntity.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Put('update/:id')
  updateBoardGame(@Param('id') id: number,
                  @Body() command: UpdateBoardGameCommand): Promise<GameDto> {
    return this.boardGameService.updateById(id, command);
  }

  @HasRoles(UserRoleEntity.EMPLOYEE, UserRoleEntity.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Delete('delete/:id')
  deleteBoardGame(@Param('id') id: number): Promise<boolean> {
    return this.boardGameService.deleteById(id);
  }

  @HasRoles(UserRoleEntity.EMPLOYEE, UserRoleEntity.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Put(':id/remove-tag/:tagId')
  removeTagFromGame(@Param('id') id: number,
                    @Param('tagId') tagId: number): Promise<GameDto> {
    return this.boardGameService.removeTagFromGameById(id, tagId);
  }

  @HasRoles(UserRoleEntity.EMPLOYEE, UserRoleEntity.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Put(':id/add-tag/:tagId')
  addTagToGame(@Param('id') id: number,
               @Param('tagId') tagId: number): Promise<GameDto> {
    return this.boardGameService.addTagToGameById(id, tagId);
  }

  @HasRoles(UserRoleEntity.EMPLOYEE, UserRoleEntity.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Put(':id/add-element/:gameElementId')
  addGameElementToGame(@Param('id') id: number, @Param('gameElementId') gameElementId: number): Promise<GameDto> {
    return this.boardGameService.addGameElementToGameById(id, gameElementId);
  }

  @HasRoles(UserRoleEntity.EMPLOYEE, UserRoleEntity.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Put(':id/remove-element/:gameElementId')
  removeGameElementFromGame(@Param('id') id: number, @Param('gameElementId') gameElementId: number): Promise<GameDto> {
    return this.boardGameService.removeGameElementFromGameById(id, gameElementId);
  }

}
