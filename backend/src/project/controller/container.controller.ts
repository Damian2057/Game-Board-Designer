import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ContainerService } from "../service/container.service";
import { ContainerDto } from "../model/dto/container.dto";
import { UpdateContainerCommand } from "../model/command/container/update.container.command";
import { CreateContainerCommand } from "../model/command/container/create.container.command";
import { ElementDto } from "../model/dto/element.dto";

@Controller('container')
export class ContainerController {

  constructor(
    private readonly containerService: ContainerService,
  ) {}

  @Put('update-container/:containerId')
  async updateContainer(@Body() command: UpdateContainerCommand, @Param('containerId') containerId: number): Promise<ContainerDto> {
    return this.containerService.updateContainer(command, containerId);
  }

  @Post('add-container/:projectId')
  async addContainer(@Body() command: CreateContainerCommand, @Param('projectId') projectId: number): Promise<ContainerDto> {
    return this.containerService.addContainer(command, projectId);
  }

  @Get(':containerId')
  async getContainerById(@Param('containerId') containerId: number): Promise<ContainerDto> {
    return this.containerService.getContainerById(containerId);
  }

  @Get('containers-elements/:containerId')
  async getAllContainerElementsByContainerId(@Param('containerId') containerId: number): Promise<ElementDto[]> {
    return this.containerService.getAllContainerElementsByContainerId(containerId);
  }

  @Delete('delete-container/:containerId')
  async deleteContainerById(@Param('containerId') containerId: number): Promise<void> {
    return this.containerService.deleteContainerById(containerId);
  }

  @Delete('delete-containers/:projectId')
  async deleteAllContainersByProjectId(@Param('projectId') projectId: number): Promise<void> {
    return this.containerService.deleteAllContainersByProjectId(projectId);
  }
}
