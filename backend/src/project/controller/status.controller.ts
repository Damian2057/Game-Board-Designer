import { Controller, Get, Param, Put } from "@nestjs/common";

@Controller('status')
export class StatusController {

  @Put('update-status/:projectId')
  async updateStatus(@Param('projectId') projectId: number) {

  }

  @Get('available-statuses')
  async getAvailableStatuses() {

  }
}
