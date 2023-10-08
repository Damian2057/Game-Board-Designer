import { HasRoles } from "../../auth/decorator/role.decorator";
import { UserRole } from "../../users/model/domain/user.role.enum";
import { Body, Controller, Delete, Get, Param, Put, UseGuards } from "@nestjs/common";
import { JwtGuard } from "../../auth/guard/jwt.guard";
import { RolesGuard } from "../../auth/guard/roles.guard";
import { PropertyService } from "../service/property.service";
import { UpdatePropertyCommand } from "../model/command/property/update.property.command";

@HasRoles(UserRole.EMPLOYEE, UserRole.ADMIN)
@UseGuards(JwtGuard, RolesGuard)
@Controller('property')
export class PropertyController {

  constructor(
    private readonly propertyService: PropertyService,
  ) {}

  @HasRoles(UserRole.EMPLOYEE, UserRole.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Put(':id')
  async updatePriority(@Body() command: UpdatePropertyCommand, @Param('id') id: number): Promise<any> {
    return this.propertyService.updateProperty(command, id);
  }

  @HasRoles(UserRole.EMPLOYEE, UserRole.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Get(':id')
  getProperty(@Param('id') id: number): Promise<any> {
    return this.propertyService.getProperty(id);
  }

  @HasRoles(UserRole.EMPLOYEE, UserRole.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Delete(':id')
  deleteProperty(@Param('id') id: number): Promise<any> {
    return this.propertyService.deleteProperty(id);
  }
}
