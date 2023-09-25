import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards } from "@nestjs/common";
import { GameService } from "../service/game.service";
import { HasRoles } from "../../auth/decorator/role.decorator";
import { UserRole } from "../../users/model/domain/user.role.enum";
import { JwtGuard } from "../../auth/guard/jwt.guard";
import { RolesGuard } from "../../auth/guard/roles.guard";
import { GameDto } from "../model/dto/game.dto";
import { CreateGameCommand } from "../model/command/create.game.command";
import { UpdateGameCommand } from "../model/command/update.game.command";
import { Result } from "../../util/pojo/Result";
import { Pagination } from "nestjs-typeorm-paginate";

@Controller('game')
export class GameController {

  constructor(private readonly boardGameService: GameService) {}

  @Get('all')
  getAllBoardGames(): Promise<GameDto[]> {
    return this.boardGameService.findAll();
  }

  @Get('all/paged')
  async getAllBoardGamesPaged(@Query('page', ParseIntPipe) page: number,
                              @Query('limit', ParseIntPipe) limit: number,
                              @Query('tags') tags?: string,
                              @Query('title') title?: string): Promise<Pagination<GameDto>> {
    return this.boardGameService.findAllPaged(page, limit, tags ? tags.split(',') : [], title);
  }

  @Get(':id')
  getBoardGameById(@Param('id') id: number): Promise<GameDto> {
    return this.boardGameService.findById(id);
  }

  @Get('find/by')
  getGameBoardByFilter(@Query('id') id?: number,
             @Query('title') title?: string,
             @Query('tags') tags?: string): Promise<GameDto[]> {
    return this.boardGameService.findByFilter(id, title, tags);
  }

  @HasRoles(UserRole.EMPLOYEE, UserRole.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Post('create')
  createBoardGame(@Body() command: CreateGameCommand): Promise<GameDto> {
    return this.boardGameService.create(command);
  }

  @HasRoles(UserRole.EMPLOYEE, UserRole.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Put('update/:id')
  updateBoardGame(@Param('id') id: number,
                  @Body() command: UpdateGameCommand): Promise<GameDto> {
    return this.boardGameService.updateById(id, command);
  }

  @HasRoles(UserRole.EMPLOYEE, UserRole.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Delete('delete/:id')
  deleteBoardGame(@Param('id') id: number): Promise<Result> {
    return this.boardGameService.deleteById(id);
  }

  @HasRoles(UserRole.EMPLOYEE, UserRole.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Put(':id/remove-tag/:tagId')
  removeTagFromGame(@Param('id') id: number,
                    @Param('tagId') tagId: number): Promise<GameDto> {
    return this.boardGameService.removeTagFromGameById(id, tagId);
  }

  @HasRoles(UserRole.EMPLOYEE, UserRole.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Put(':id/add-tag/:tagId')
  addTagToGame(@Param('id') id: number,
               @Param('tagId') tagId: number): Promise<GameDto> {
    return this.boardGameService.addTagToGameById(id, tagId);
  }
}
