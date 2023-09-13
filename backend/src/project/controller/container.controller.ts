import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ContainerService } from "../service/container.service";
import { ContainerDto } from "../model/dto/container.dto";
import { UpdateContainerCommand } from "../model/command/container/update.container.command";
import { CreateContainerCommand } from "../model/command/container/create.container.command";
import { ElementDto } from "../model/dto/element.dto";
import { Result } from "../../util/pojo/Result";
import { HasRoles } from "../../auth/decorator/role.decorator";
import { UserRole } from "../../users/model/domain/user.role.enum";
import { JwtGuard } from "../../auth/guard/jwt.guard";
import { RolesGuard } from "../../auth/guard/roles.guard";

@HasRoles(UserRole.EMPLOYEE, UserRole.ADMIN)
@UseGuards(JwtGuard, RolesGuard)
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
  async addContainer(@Body() command: CreateContainerCommand, @Param('projectId') projectId: number): Promise<ContainerDto[]> {
    return this.containerService.addContainer(command, projectId);
  }

  @Get(':containerId')
  async getContainerById(@Param('containerId') containerId: number): Promise<ContainerDto> {
    return this.containerService.getContainerDtoById(containerId);
  }

  @Get('containers-elements/:containerId')
  async getAllContainerElementsByContainerId(@Param('containerId') containerId: number): Promise<ElementDto[]> {
    return this.containerService.getAllContainerElementsByContainerId(containerId);
  }

  @Delete('delete-container/:containerId')
  async deleteContainerById(@Param('containerId') containerId: number): Promise<Result> {
    return this.containerService.deleteContainerById(containerId);
  }

  @Delete('delete-containers/:projectId')
  async deleteAllContainersByProjectId(@Param('projectId') projectId: number): Promise<Result> {
    return this.containerService.deleteAllContainersByProjectId(projectId);
  }
}
