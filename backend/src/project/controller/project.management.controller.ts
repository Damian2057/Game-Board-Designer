import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { GetCurrentUser } from "../../auth/decorator/current.user.decorator";
import { ProjectManagementService } from "../service/project.management.service";
import { UpdateProjectCommand } from "../model/command/project-management/update.project.command";
import { ProjectDto } from "../model/dto/project.dto";

@Controller('project')
export class ProjectManagementController {

  constructor(
    private readonly projectManagementService: ProjectManagementService,
  ) {}

  @Post('start-new-project/:projectId')
  async createNewProjectBasedOnExistingProject(@GetCurrentUser() user, @Param('projectId') projectId: number): Promise<ProjectDto> {
    return this.projectManagementService.createNewProjectBasedOnExistingProject(user, projectId);
  }


  @Get('my-projects')
  async getMyProjects(@GetCurrentUser() user): Promise<ProjectDto[]> {
    return this.projectManagementService.getMyProjects(user);
  }

  @Get('my-completed-projects')
  async getMyCompletedProjects(@GetCurrentUser() user): Promise<ProjectDto[]> {
    return this.projectManagementService.getMyCompletedProjects(user);
  }

  @Get('my-ongoing-projects')
  async getMyOngoingProjects(@GetCurrentUser() user): Promise<ProjectDto[]> {
    return this.projectManagementService.getMyOngoingProjects(user);
  }

  @Get('all-projects/:userId')
  async getAllProjectsForUser(@Param('userId') userId: number): Promise<ProjectDto[]> {
    return this.projectManagementService.getAllProjectsForUser(userId);
  }

  @Get('all-completed-projects/:userId')
  async getAllCompletedProjects(@Param('userId') userId: number): Promise<ProjectDto[]> {
    return this.projectManagementService.getAllCompletedProjects(userId);
  }

  @Get('all-ongoing-projects/:userId')
  async getAllOngoingProjects(@Param('userId') userId: number): Promise<ProjectDto[]> {
    return this.projectManagementService.getAllOngoingProjects(userId);
  }

  @Put('update-project/:projectId')
  async updateProject(@Body() command: UpdateProjectCommand, @Param('projectId') projectId: number): Promise<ProjectDto> {
    return this.projectManagementService.updateProject(command, projectId);
  }
}
