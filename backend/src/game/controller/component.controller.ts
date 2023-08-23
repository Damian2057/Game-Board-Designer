import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { ComponentService } from "../service/component.service";
import { UpdateComponentCommand } from "../model/command/update.component.command";
import { HasRoles } from "../../auth/decorator/role.decorator";
import { UserRole } from "../../users/model/domain/user.role.enum";
import { JwtGuard } from "../../auth/guard/jwt.guard";
import { RolesGuard } from "../../auth/guard/roles.guard";
import { ComponentDto } from "../model/dto/component.dto";
import { CreateComponentCommand } from "../model/command/create.component.command";
import { GameDto } from "../model/dto/game.dto";
import { Result } from "../../util/pojo/Result";

@Controller('component')
export class ComponentController {

  constructor(private readonly componentService: ComponentService) {
  }

  @HasRoles(UserRole.EMPLOYEE, UserRole.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Put('update/:id')
  updateComponent(@Param('id') id: number,
                  @Body() command: UpdateComponentCommand): Promise<ComponentDto> {
    return this.componentService.updateById(id, command);
  }

  @Get('all/:id')
  getAllComponentsByGameId(@Param('id') id: number): Promise<ComponentDto[]> {
    return this.componentService.findByBoardGame(id);
  }

  @Get('/all')
  getAllComponents(): Promise<ComponentDto[]> {
    return this.componentService.findAll();
  }

  @HasRoles(UserRole.EMPLOYEE, UserRole.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Get('find')
  getComponentByFilter(@Query('id') id?: number,
                       @Query('name') name?: string): Promise<ComponentDto[]> {
    return this.componentService.find(id, name);
  }

  @HasRoles(UserRole.EMPLOYEE, UserRole.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Delete('delete/:id')
  deleteGameElement(@Param('id') id: number): Promise<Result> {
    return this.componentService.deleteById(id);
  }

  @HasRoles(UserRole.EMPLOYEE, UserRole.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Post('create/:gameId')
  addGameElement(@Param('gameId') gameId: number ,@Body() element: CreateComponentCommand): Promise<GameDto> {
    return this.componentService.add(element, gameId);
  }
}