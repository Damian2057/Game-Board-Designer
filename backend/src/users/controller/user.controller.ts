import { Body, Controller, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { UserService } from "../service/user.service";
import { HasRoles } from "../../auth/decorator/role.decorator";
import { RolesGuard } from "../../auth/guard/roles.guard";
import { JwtGuard } from "../../auth/guard/jwt.guard";
import { UserRole } from "../model/domain/user.role.enum";
import { UserUpdateCommand } from "../model/command/user.update.command";
import { UserDto } from "../model/dto/user.dto";
import { UserRegisterCommand } from "../model/command/user.register.command";
import { GetCurrentUser } from "../../auth/decorator/current.user.decorator";
import { HierarchyGuard } from "../guards/hierarchy.guard";
import { Result } from "../../util/pojo/Result";
import { UserActivateCommand } from "../model/command/user.activate.command";
import { AdvancedUserUpdateCommand } from "../model/command/advanced.user.update.command";

@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService) {}

  @Post('register')
  register(@Body() command: UserRegisterCommand): Promise<Result> {
    return this.userService.register(command);
  }

  @HasRoles(UserRole.EMPLOYEE, UserRole.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Get('all')
  getUsers(): Promise<UserDto[]> {
    return this.userService.findAll();
  }

  @HasRoles(UserRole.EMPLOYEE, UserRole.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Get('roles')
  getRoles(): string[] {
    return this.userService.getRoles();
  }

  @UseGuards(JwtGuard, RolesGuard, HierarchyGuard)
  @Put('self_update')
  updateUser(@GetCurrentUser() user, @Body() command: UserUpdateCommand): Promise<UserDto> {
    return this.userService.selfUpdate(user, command);
  }

  @HasRoles(UserRole.ADMIN, UserRole.EMPLOYEE)
  @UseGuards(JwtGuard, RolesGuard, HierarchyGuard)
  @Put('update/:id')
  updateUserById(@Param('id') id: number, @Body() command: AdvancedUserUpdateCommand): Promise<UserDto> {
    return this.userService.updateById(id, command);
  }

  @Get('self')
  @UseGuards(JwtGuard)
  getCurrentUser(@GetCurrentUser() user): Promise<UserDto> {
    return this.userService.me(user);
  }

  @HasRoles(UserRole.EMPLOYEE, UserRole.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Get('find')
  getUsersByFiler(@Query('roles') role?: string,
                  @Query('email') email?: string,
                  @Query('username') username?: string,
                  @Query('phoneNumber') phoneNumber?: string,
                  @Query('id') id?: number,
                  @Query('roles') roles?: string): Promise<UserDto[]> {
    return this.userService.find(role, email, username, phoneNumber, id);
  }

  @Put('activate')
  async activate(@Body() command: UserActivateCommand): Promise<void> {
    return await this.userService.activate(command);
  }
}
