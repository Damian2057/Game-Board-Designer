import { Body, Controller, Get, Param, Put } from "@nestjs/common";
import { PriorityService } from "../service/priority.service";
import { ProjectDto } from "../model/dto/project.dto";
import { UpdatePriorityCommand } from "../model/command/priority/update.priority.command";

@Controller('priority')
export class PriorityController {

  constructor(
    private readonly priorityService: PriorityService,
  ) {}

  @Put('update-priority/:projectId')
  async updatePriority(@Body() command: UpdatePriorityCommand, @Param('projectId') projectId: number): Promise<ProjectDto> {
    return this.priorityService.updatePriority(command, projectId);
  }

  @Get('available-priorities')
  getAvailablePriorities(): string[] {
    return this.priorityService.getAvailablePriorities();
  }
}
