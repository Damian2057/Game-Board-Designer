import { Body, Controller, Get, Param, Put, Query, UseGuards } from "@nestjs/common";
import { UserService } from "../service/user.service";
import { hasRoles } from "../../auth/decorator/role.decorator";
import { RolesGuard } from "../../auth/guard/roles.guard";
import { JwtGuard } from "../../auth/guard/jwt.guard";
import { User } from "../model/domain/user.entity";
import { UserRoleEntity } from "../model/domain/user.role.entity";
import { UserUpdateCommand } from "../model/command/user.update.command";
import { UserDto } from "../model/dto/user.dto";

@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService) {}

  @Get('all')
  getUsers(): Promise<UserDto[]> {
    return null
  }

  @Get('roles')
  getRoles(): Promise<UserRoleEntity[]> {
    return null
  }

  @Put('update')
  editUser(@Body() command: UserUpdateCommand): UserDto {
    return null;
  }

  @Get('me')
  getCurrentUser(): Promise<UserDto> {
    return null;
  }

  @Get('by_filter')
  getUsersByFiler(@Query('role') role?: string,
                  @Query('email') email?: string, ): Promise<UserDto[]> {
    return null;
  }

  @Get(':id')
  getUserById(@Param() id: number): Promise<UserDto> {
    return null;
  }

  @Get()
  getHello(): any {
    return "Hello World!"
  }
}
