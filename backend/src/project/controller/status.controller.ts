import { Body, Controller, Get, Param, Put } from "@nestjs/common";
import { ProjectDto } from "../model/dto/project.dto";
import { StatusService } from "../service/status.service";
import { UpdateStatusCommand } from "../model/command/status/update.status.command";

@Controller('status')
export class StatusController {

  constructor(
    private readonly statusService: StatusService,
  ) {}

  @Put('update-status/:projectId')
  async updateStatus(@Body() command: UpdateStatusCommand, @Param('projectId') projectId: number): Promise<ProjectDto> {
    return this.statusService.updateStatus(command, projectId);
  }

  @Get('available-statuses')
  getAvailableStatuses(): string[] {
    return this.statusService.getAvailableStatuses();
  }
}
