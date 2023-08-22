import { Controller, Get, Param, Put } from "@nestjs/common";

@Controller('priority')
export class PriorityController {

  @Put('update-priority/:projectId')
  async updatePriority(@Param('projectId') projectId: number) {

  }

  @Get('available-priorities')
  async getAvailablePriorities() {

  }
}
