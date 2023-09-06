import { Controller, Put, Query, UseGuards } from "@nestjs/common";
import { HasRoles } from "../../auth/decorator/role.decorator";
import { UserRole } from "../../users/model/domain/user.role.enum";
import { JwtGuard } from "../../auth/guard/jwt.guard";
import { RolesGuard } from "../../auth/guard/roles.guard";
import { InformationService } from "../service/information.service";
import { UpdatedInformationCommand } from "../model/command/updated.information.command";

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
                    @Query('email') email?: string): Promise<UpdatedInformationCommand> {
    return this.informationService.updateAbout(address, phoneNumber, email);
  }
}
