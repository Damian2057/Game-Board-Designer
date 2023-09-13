import { Controller, Get, Put, Query, UseGuards } from "@nestjs/common";
import { HasRoles } from "../../auth/decorator/role.decorator";
import { UserRole } from "../../users/model/domain/user.role.enum";
import { JwtGuard } from "../../auth/guard/jwt.guard";
import { RolesGuard } from "../../auth/guard/roles.guard";
import { InformationService } from "../service/information.service";
import { InformationDto } from "../model/dto/information.dto";

@Controller('configuration')
export class InformationController {

  constructor(
    private readonly informationService: InformationService
  ) {}

  @HasRoles(UserRole.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Put('update/about')
  async updatePhone(@Query('address') address?: string,
                    @Query('phoneNumber') phoneNumber?: string,
                    @Query('email') email?: string): Promise<InformationDto> {
    return this.informationService.updateAbout(address, phoneNumber, email);
  }

  @Get('about')
  async getAbout(): Promise<InformationDto> {
    return this.informationService.getAbout();
  }
}
