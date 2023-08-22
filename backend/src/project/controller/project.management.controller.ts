import { Controller, Get, Param, Post, Put } from "@nestjs/common";
import { GetCurrentUser } from "../../auth/decorator/current.user.decorator";
import { ProjectManagementService } from "../service/project.management.service";

@Controller('project')
export class ProjectManagementController {

  constructor(
    private readonly projectManagementService: ProjectManagementService,
  ) {}

  @Post('start-new-project/:projectId')
  async createNewProjectBasedOnExistingProject(@GetCurrentUser() user, @Param('projectId') projectId: number) {
    return
  }


  @Get('my-projects')
  async getMyProjects(@GetCurrentUser() user) {

  }

  @Get('my-completed-projects')
  async getMyCompletedProjects(@GetCurrentUser() user) {

  }

  @Get('my-ongoing-projects')
  async getMyOngoingProjects(@GetCurrentUser() user) {

  }

  @Get('all-projects/:userId')
  async getAllProjectsForUser(@Param('userId') userId: number) {

  }

  @Get('all-completed-projects/:userId')
  async getAllCompletedProjects(@Param('userId') userId: number) {

  }

  @Get('all-ongoing-projects/:userId')
  async getAllOngoingProjects(@Param('userId') userId: number) {

  }

  @Put('update-project/:projectId')
  async updateProject(@Param('projectId') projectId: number) {

  }
}
