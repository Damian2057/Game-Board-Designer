import { Body, Controller, Get, Param, Put, UseGuards } from "@nestjs/common";
import { PriorityService } from "../service/priority.service";
import { UpdatePriorityCommand } from "../model/command/priority/update.priority.command";
import { HasRoles } from "../../auth/decorator/role.decorator";
import { UserRole } from "../../users/model/domain/user.role.enum";
import { JwtGuard } from "../../auth/guard/jwt.guard";
import { RolesGuard } from "../../auth/guard/roles.guard";

@Controller('priority')
export class PriorityController {

  constructor(
    private readonly priorityService: PriorityService,
  ) {}

  @HasRoles(UserRole.EMPLOYEE, UserRole.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Put('update-priority/:id')
  async updatePriority(@Body() command: UpdatePriorityCommand, @Param('id') id: number): Promise<any> {
    return this.priorityService.updatePriority(command, id);
  }

  @HasRoles(UserRole.EMPLOYEE, UserRole.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Get('available-priorities')
  getAvailablePriorities(): string[] {
    return this.priorityService.getAvailablePriorities();
  }
}
