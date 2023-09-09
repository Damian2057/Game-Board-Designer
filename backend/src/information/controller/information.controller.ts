import { Controller, Get, Put, Query, UseGuards } from "@nestjs/common";
import { HasRoles } from "../../auth/decorator/role.decorator";
import { UserRole } from "../../users/model/domain/user.role.enum";
import { JwtGuard } from "../../auth/guard/jwt.guard";
import { RolesGuard } from "../../auth/guard/roles.guard";
import { InformationService } from "../service/information.service";
import { UpdatedInformationDto } from "../model/dto/updated.information.dto";

@HasRoles(UserRole.ADMIN)
@UseGuards(JwtGuard, RolesGuard)
@Controller('configuration')
export class InformationController {

  constructor(
    private readonly informationService: InformationService
  ) {}

  @Put('update/about')
  async updatePhone(@Query('address') address?: string,
                    @Query('phoneNumber') phoneNumber?: string,
                    @Query('email') email?: string): Promise<UpdatedInformationDto> {
    return this.informationService.updateAbout(address, phoneNumber, email);
  }

  @Get('about')
  async getAbout(): Promise<UpdatedInformationDto> {
    return this.informationService.getAbout();
  }
}
