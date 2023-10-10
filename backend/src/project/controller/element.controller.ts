import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ElementService } from "../service/element.service";
import { ElementDto } from "../model/dto/element.dto";
import { UpdateElementCommand } from "../model/command/element/update.element.command";
import { CreateElementCommand } from "../model/command/element/create.element.command";
import { Result } from "../../util/pojo/Result";
import { HasRoles } from "../../auth/decorator/role.decorator";
import { UserRole } from "../../users/model/domain/user.role.enum";
import { JwtGuard } from "../../auth/guard/jwt.guard";
import { RolesGuard } from "../../auth/guard/roles.guard";
import { CreatePropertyCommand } from "../model/command/property/create.property.command";

@HasRoles(UserRole.EMPLOYEE, UserRole.ADMIN)
@UseGuards(JwtGuard, RolesGuard)
@Controller('element')
export class ElementController {

  constructor(
    private readonly elementService: ElementService,
  ) {}

  @Put('update-element/:elementId')
  async updateElement(@Body() command: UpdateElementCommand, @Param('elementId') elementId: number): Promise<ElementDto> {
    return this.elementService.updateElement(command, elementId);
  }

  @Post('add-container-element/:containerId')
  async addContainerElement(@Body() command: CreateElementCommand, @Param('containerId') containerId: number): Promise<ElementDto[]> {
    return this.elementService.addContainerElement(command, containerId);
  }

  @Post('add-project-element/:projectId')
  async addProjectElement(@Body() command: CreateElementCommand, @Param('projectId') projectId: number): Promise<ElementDto[]> {
    return this.elementService.addProjectElement(command, projectId);
  }

  @Get(':elementId')
  async getElementById(@Param('elementId') elementId: number): Promise<ElementDto> {
    return this.elementService.getElementDtoById(elementId);
  }

  @Delete('delete-element/:elementId')
  async deleteElementById(@Param('elementId') elementId: number): Promise<Result> {
    return this.elementService.deleteElementById(elementId);
  }

  @Put('property-element/:elementId')
  async addPropertyToElement(@Body() command: CreatePropertyCommand, @Param('elementId') elementId: number): Promise<ElementDto> {
    return this.elementService.addPropertyToElement(command, elementId);
  }
}
