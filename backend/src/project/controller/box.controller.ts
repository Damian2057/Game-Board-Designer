import { Body, Controller, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { CreateBoxCommand } from "../model/command/box/create.box.command";
import { BoxService } from "../service/box.service";
import { BoxDto } from "../model/dto/box.dto";
import { UpdateBoxCommand } from "../model/command/box/update.box.command";
import { HasRoles } from "../../auth/decorator/role.decorator";
import { UserRole } from "../../users/model/domain/user.role.enum";
import { JwtGuard } from "../../auth/guard/jwt.guard";
import { RolesGuard } from "../../auth/guard/roles.guard";
import { CreatePropertyCommand } from "../model/command/property/create.property.command";

@HasRoles(UserRole.EMPLOYEE, UserRole.ADMIN)
@UseGuards(JwtGuard, RolesGuard)
@Controller('box')
export class BoxController {

  constructor(
    private readonly boxService: BoxService,
  ) {}

  @Post('create-new-box')
  async createNewBox(@Body() command: CreateBoxCommand): Promise<BoxDto> {
    return this.boxService.createNewBox(command);
  }

  @Get('all')
  async getAllBoxes(): Promise<BoxDto[]> {
    return this.boxService.getAllBoxes();
  }

  @Get(':id')
  async getBoxById(@Param('id') id: number): Promise<BoxDto> {
    return this.boxService.getBoxDtoById(id);
  }

  @Put('update-box/:boxId')
  async updateBox(@Body() command: UpdateBoxCommand, @Param('boxId') boxId: number): Promise<BoxDto> {
    return this.boxService.updateBox(command, boxId);
  }

  @Put('property-box/:boxId')
  async addProperties(@Body() command: CreatePropertyCommand, @Param('boxId') boxId: number): Promise<BoxDto> {
    return this.boxService.addProperty(command, boxId);
  }
}
