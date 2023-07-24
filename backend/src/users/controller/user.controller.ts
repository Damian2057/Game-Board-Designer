import { Controller, Get, UseGuards } from "@nestjs/common";
import { UserService } from "../service/user.service";
import { hasRoles } from "../../auth/decorator/role.decorator";
import { RolesGuard } from "../../auth/guard/roles.guard";
import { JwtGuard } from "../../auth/guard/jwt.guard";

@Controller()
export class UserController {

  constructor(private readonly userService: UserService) {}

  @Get()
  @hasRoles("admin")
  @UseGuards(RolesGuard, JwtGuard)
  getHello(): string {
    return "Hello World!";
  }
}
