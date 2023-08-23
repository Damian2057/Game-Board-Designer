import { Body, Controller, Get, Param, Put } from "@nestjs/common";
import { StatusService } from "../service/status.service";
import { UpdateStatusCommand } from "../model/command/status/update.status.command";

@Controller('status')
export class StatusController {

  constructor(
    private readonly statusService: StatusService,
  ) {}

  @Put('update-status/:id')
  async updateStatus(@Body() command: UpdateStatusCommand, @Param('id') id: number): Promise<any> {
    return this.statusService.updateStatus(command, id);
  }

  @Get('available-statuses')
  getAvailableStatuses(): string[] {
    return this.statusService.getAvailableStatuses();
  }
}
