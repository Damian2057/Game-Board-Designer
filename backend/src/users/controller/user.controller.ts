import { Body, Controller, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { UserService } from "../service/user.service";
import { hasRoles } from "../../auth/decorator/role.decorator";
import { RolesGuard } from "../../auth/guard/roles.guard";
import { JwtGuard } from "../../auth/guard/jwt.guard";
import { UserRoleEntity } from "../model/domain/user.role.entity";
import { UserUpdateCommand } from "../model/command/user.update.command";
import { UserDto } from "../model/dto/user.dto";
import { UserRegisterCommand } from "../model/command/user.register.command";
import { UserUpdateRoleCommand } from "../model/command/user.update.role.command";

@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService) {}

  @Post('register')
  register(@Body() command: UserRegisterCommand): Promise<boolean> {
    return this.userService.create(command);
  }

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

  @Put('update_role')
  updateRole(@Body() command: UserUpdateRoleCommand): UserDto {
    return null;
  }

  @Get('me')
  getCurrentUser(): Promise<UserDto> {
    return null;
  }

  @Get('by_filter')
  getUsersByFiler(@Query('role') role?: string,
                  @Query('email') email?: string): Promise<UserDto[]> {
    return null;
  }

  @Get(':id')
  getUserById(@Param() id: number): Promise<UserDto> {
    return this.userService.findOne(id);
  }

  @hasRoles(UserRoleEntity.USER)
  @UseGuards(JwtGuard, RolesGuard)
  @Get()
  getHello(): string {
    return 'Hello World!';
  }
}
