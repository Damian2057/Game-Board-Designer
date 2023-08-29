import { Body, Controller, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ProjectCreatorService } from "../service/project.creator.service";
import { CreateProjectCommand } from "../model/command/project-creator/create.project.command";
import { ProjectDto } from "../model/dto/project.dto";
import { ContainerDto } from "../model/dto/container.dto";
import { ElementDto } from "../model/dto/element.dto";
import { UpdateProjectCommand } from "../model/command/project-creator/update.project.command";
import { HasRoles } from "../../auth/decorator/role.decorator";
import { UserRole } from "../../users/model/domain/user.role.enum";
import { JwtGuard } from "../../auth/guard/jwt.guard";
import { RolesGuard } from "../../auth/guard/roles.guard";

@HasRoles(UserRole.EMPLOYEE, UserRole.ADMIN)
@UseGuards(JwtGuard, RolesGuard)
@Controller('project')
export class ProjectCreatorController {

  constructor(
    private readonly projectCreatorService: ProjectCreatorService,
  ) {}

  @Post('create-new-project-template')
  async createNewProjectTemplate(@Body() command: CreateProjectCommand): Promise<ProjectDto> {
    return this.projectCreatorService.createNewProjectTemplate(command);
  }

  @Get('all-projects-template')
  async getAllProjectsTemplate(): Promise<ProjectDto[]> {
    return this.projectCreatorService.getAllProjectsTemplate();
  }

  @Get('all-projects/:gameId')
  async getAllProjectsForGame(@Param('gameId') gameId: number): Promise<ProjectDto[]> {
    return this.projectCreatorService.getAllProjectsForGame(gameId);
  }

  @Get('all')
  async getAllProjectsAndTemplates(): Promise<ProjectDto[]> {
    return this.projectCreatorService.getAllProjectsAndTemplates();
  }

  @Get('/:projectId')
  async getProjectById(@Param('projectId') projectId: number): Promise<ProjectDto> {
    return this.projectCreatorService.getProjectDtoById(projectId);
  }

  @Put('complete-project/:projectId')
  async completeProject(@Param('projectId') projectId: number): Promise<ProjectDto> {
    return this.projectCreatorService.completeProject(projectId);
  }

  @Get('containers/:projectId')
  async getAllContainersByProjectId(@Param('projectId') projectId: number): Promise<ContainerDto[]> {
    return this.projectCreatorService.getAllContainersByProjectId(projectId);
  }

  @Get('elements/:projectId')
  async getAllProjectElementsByProjectId(@Param('projectId') projectId: number): Promise<ElementDto[]> {
    return this.projectCreatorService.getAllProjectElementsByProjectId(projectId);
  }

  @Put('update-project/:projectId')
  async updateProject(@Body() command: UpdateProjectCommand, @Param('projectId') projectId: number): Promise<ProjectDto> {
    return this.projectCreatorService.updateProject(command, projectId);
  }
}
