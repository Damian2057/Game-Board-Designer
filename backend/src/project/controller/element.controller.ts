import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ElementService } from "../service/element.service";
import { ElementDto } from "../model/dto/element.dto";
import { UpdateElementCommand } from "../model/command/element/update.element.command";
import { CreateElementCommand } from "../model/command/element/create.element.command";

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
  async addContainerElement(@Body() command: CreateElementCommand, @Param('containerId') containerId: number): Promise<ElementDto> {
    return this.elementService.addContainerElement(command, containerId);
  }

  @Post('add-project-element/:projectId')
  async addProjectElement(@Body() command: CreateElementCommand, @Param('projectId') projectId: number): Promise<ElementDto> {
    return this.elementService.addProjectElement(command, projectId);
  }

  @Get(':elementId')
  async getElementById(@Param('elementId') elementId: number): Promise<ElementDto> {
    return this.elementService.getElementById(elementId);
  }

  @Delete('delete-element/:elementId')
  async deleteElementById(@Param('elementId') elementId: number): Promise<void> {
    return this.elementService.deleteElementById(elementId);
  }
}
