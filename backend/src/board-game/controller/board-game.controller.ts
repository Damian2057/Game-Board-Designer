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
  getAllTags(): Promise<BoardGameDto[]> {
    return this.boardGameService.findAll();
  }

  @HasRoles(UserRoleEntity.EMPLOYEE, UserRoleEntity.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Get('find')
  getTagById(@Query('id') id?: number,
             @Query('name') name?: string): Promise<BoardGameDto[]> {
    return this.boardGameService.findByFilter(id, name);
  }

  @HasRoles(UserRoleEntity.EMPLOYEE, UserRoleEntity.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Post('create')
  createTag(@Body() command: CreateBoardGameCommand): Promise<boolean> {
    return this.boardGameService.create(command);
  }

  @HasRoles(UserRoleEntity.EMPLOYEE, UserRoleEntity.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Put('update/:id')
  updateTag(@Param('id') id: number, @Body() command: UpdateBoardGameCommand): Promise<BoardGameDto> {
    return this.boardGameService.updateById(id, command);
  }

  @HasRoles(UserRoleEntity.EMPLOYEE, UserRoleEntity.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Delete('delete/:id')
  deleteTag(@Param('id') id: number): Promise<boolean> {
    return this.boardGameService.deleteById(id);
  }
}
