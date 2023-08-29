import { Body, Controller, Get, Param, Put, UseGuards } from "@nestjs/common";
import { StatusService } from "../service/status.service";
import { UpdateStatusCommand } from "../model/command/status/update.status.command";
import { HasRoles } from "../../auth/decorator/role.decorator";
import { UserRole } from "../../users/model/domain/user.role.enum";
import { JwtGuard } from "../../auth/guard/jwt.guard";
import { RolesGuard } from "../../auth/guard/roles.guard";

@HasRoles(UserRole.EMPLOYEE, UserRole.ADMIN)
@UseGuards(JwtGuard, RolesGuard)
@Controller('status')
export class StatusController {

  constructor(
    private readonly statusService: StatusService,
  ) {}

  @HasRoles(UserRole.EMPLOYEE, UserRole.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Put('update-status/:id')
  async updateStatus(@Body() command: UpdateStatusCommand, @Param('id') id: number): Promise<any> {
    return this.statusService.updateStatus(command, id);
  }

  @HasRoles(UserRole.EMPLOYEE, UserRole.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Get('available-statuses')
  getAvailableStatuses(): string[] {
    return this.statusService.getAvailableStatuses();
  }
}
