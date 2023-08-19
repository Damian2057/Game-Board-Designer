import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { ComponentService } from "../service/component.service";
import { UpdateComponentCommand } from "../model/command/update.component.command";
import { HasRoles } from "../../auth/decorator/role.decorator";
import { UserRole } from "../../users/model/domain/userRole";
import { JwtGuard } from "../../auth/guard/jwt.guard";
import { RolesGuard } from "../../auth/guard/roles.guard";
import { ComponentDto } from "../model/dto/component.dto";
import { CreateComponentCommand } from "../model/command/create.component.command";

@Controller('component')
export class ComponentController {

  constructor(private readonly gameElementService: ComponentService) {
  }

  @HasRoles(UserRole.EMPLOYEE, UserRole.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Put('update/:id')
  updateGameElement(@Param('id') id: number,
                    @Body() element: UpdateComponentCommand): Promise<ComponentDto> {
    return this.gameElementService.updateById(id, element);
  }

  @Get('all/:id')
  getAllGameElementsByBoardGame(@Param('id') id: number): Promise<ComponentDto[]> {
    return this.gameElementService.findByBoardGame(id);
  }

  @Get('/all')
  getAllGameElements(): Promise<ComponentDto[]> {
    return this.gameElementService.findAll();
  }

  @HasRoles(UserRole.EMPLOYEE, UserRole.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Get('find')
  getGameElementByFilter(@Query('id') id?: number,
                         @Query('name') name?: string): Promise<ComponentDto[]> {
    return this.gameElementService.find(id, name);
  }

  @HasRoles(UserRole.EMPLOYEE, UserRole.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Delete('delete/:id')
  deleteGameElement(@Param('id') id: number): Promise<boolean> {
    return this.gameElementService.deleteById(id);
  }

  @HasRoles(UserRole.EMPLOYEE, UserRole.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Post('create')
  addGameElement(@Body() element: CreateComponentCommand): Promise<boolean> {
    return this.gameElementService.add(element);
  }
}