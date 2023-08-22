import { Body, Controller, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ProjectService } from "../service/project.service";
import { CreateProjectCommand } from "../model/command/create.project.command";
import { ProjectDto } from "../model/dto/project.dto";
import { GetCurrentUser } from "../../auth/decorator/current.user.decorator";
import { JwtGuard } from "../../auth/guard/jwt.guard";
import { RolesGuard } from "../../auth/guard/roles.guard";

@Controller('project')
export class ProjectCreatorController {

  constructor(
    private readonly projectService: ProjectService,
  ) {
  }

  @Post('create-new-project-template')
  async createNewProjectTemplate(@Body() command: CreateProjectCommand): Promise<ProjectDto> {
    return this.projectService.createNewProjectTemplate(command);
  }

  @Get('all-projects-template')
  @UseGuards(JwtGuard, RolesGuard)
  async getAllProjectsTemplate(@GetCurrentUser() user) {

  }

  @Get('all-projects/:gameId')
  async getAllProjectsForGame(@Param('gameId') gameId: number) {

  }

  @Get('all')
  async getAllProjectsAndTemplates() {

  }

  @Get('/:projectId')
  async getProjectById(@Param('projectId') projectId: number) {

  }

  @Put('complete-project/:projectId')
  async completeProject(@Param('projectId') projectId: number) {

  }
}
