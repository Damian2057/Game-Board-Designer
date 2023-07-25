import { Controller, Get, Put, UseGuards } from "@nestjs/common";
import { UserService } from "../service/user.service";
import { hasRoles } from "../../auth/decorator/role.decorator";
import { RolesGuard } from "../../auth/guard/roles.guard";
import { JwtGuard } from "../../auth/guard/jwt.guard";
import { User } from "../model/domain/user.entity";

@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService) {}

  @Get('all')
  getUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Put('update')
  editUser(): User {
    return null;
  }

  @Get('me')
  getCurrentUser(): Promise<User> {
    return null;
  }

  @Get('by_role')
  getUsersByRole(): Promise<User[]> {
    return null;
  }

  @Get('by_email')
  getUserByEmail(): Promise<User> {
    return null;
  }

  @Get()
  getHello(): any {
    return "Hello World!"
  }
}
