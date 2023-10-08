import { Body, Controller, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { CreateBoxCommand } from "../model/command/box/create.box.command";
import { BoxService } from "../service/box.service";
import { BoxDto } from "../model/dto/box.dto";
import { UpdateBoxCommand } from "../model/command/box/update.box.command";
import { HasRoles } from "../../auth/decorator/role.decorator";
import { UserRole } from "../../users/model/domain/user.role.enum";
import { JwtGuard } from "../../auth/guard/jwt.guard";
import { RolesGuard } from "../../auth/guard/roles.guard";

@Controller('box')
export class BoxController {

  constructor(
    private readonly boxService: BoxService,
  ) {}

  @HasRoles(UserRole.EMPLOYEE, UserRole.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Post('create-new-box')
  async createNewBox(@Body() command: CreateBoxCommand): Promise<BoxDto> {
    return this.boxService.createNewBox(command);
  }

  @HasRoles(UserRole.EMPLOYEE, UserRole.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Get('all')
  async getAllBoxes(): Promise<BoxDto[]> {
    return this.boxService.getAllBoxes();
  }

  @Get(':id')
  async getBoxById(@Param('id') id: number): Promise<BoxDto> {
    return this.boxService.getBoxDtoById(id);
  }

  @HasRoles(UserRole.EMPLOYEE, UserRole.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Put('update-box/:boxId')
  async updateBox(@Body() command: UpdateBoxCommand, @Body('boxId') boxId: number): Promise<BoxDto> {
    return this.boxService.updateBox(command, boxId);
  }
}
