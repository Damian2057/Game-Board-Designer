import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { BoardGameService } from "../service/board-game.service";
import { HasRoles } from "../../auth/decorator/role.decorator";
import { UserRoleEntity } from "../../users/model/domain/user.role.entity";
import { JwtGuard } from "../../auth/guard/jwt.guard";
import { RolesGuard } from "../../auth/guard/roles.guard";
import { BoardGameDto } from "../model/dto/board-game.dto";
import { CreateBoardGameCommand } from "../model/command/create.board-game.command";
import { UpdateBoardGameCommand } from "../model/command/update.board-game.command";

@Controller('board-game')
export class BoardGameController {

  constructor(private readonly boardGameService: BoardGameService) {}

  @Get('all')
  getAllBoardGames(): Promise<BoardGameDto[]> {
    return this.boardGameService.findAll();
  }

  @Get('find')
  getGameBoardByFilter(@Query('id') id?: number,
             @Query('title') title?: string,
             @Query('tags') tags?: string): Promise<BoardGameDto[]> {
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
  updateBoardGame(@Param('id') id: number, @Body() command: UpdateBoardGameCommand): Promise<BoardGameDto> {
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
  @Delete(':id/delete/:tagId')
  deleteTagFromGame(@Param('id') id: number, @Param('tagId') tagId: number): Promise<BoardGameDto[]> {
    return this.boardGameService.removeTagFromGameById(id, tagId);
  }

  @HasRoles(UserRoleEntity.EMPLOYEE, UserRoleEntity.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Put(':id/add/:tagId')
  addTagToGame(@Param('id') id: number, @Param('tagId') tagId: number): Promise<BoardGameDto[]> {
    return this.boardGameService.addTagToGameById(id, tagId);
  }
}
