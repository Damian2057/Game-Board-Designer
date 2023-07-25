import { Controller, Get, Param, Put, Query, UseGuards } from "@nestjs/common";
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

  @Get('by_filter')
  getUsersByFiler(@Query('role') role?: string,
                  @Query('email') email?: string, ): Promise<User[]> {
    return null;
  }

  @Get(':id')
  getUserById(@Param() id: number): Promise<User> {
    return null;
  }

  @Get()
  getHello(): any {
    return "Hello World!"
  }
}
