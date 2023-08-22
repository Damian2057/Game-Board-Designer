import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { ProjectCreatorService } from "../service/project.creator.service";
import { CreateProjectCommand } from "../model/command/project-creator/create.project.command";
import { ProjectDto } from "../model/dto/project.dto";

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
    return this.projectCreatorService.getProjectById(projectId);
  }

  @Put('complete-project/:projectId')
  async completeProject(@Param('projectId') projectId: number): Promise<ProjectDto> {
    return this.projectCreatorService.completeProject(projectId);
  }
}
