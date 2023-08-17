import { Body, Controller, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { UserService } from "../service/user.service";
import { HasRoles } from "../../auth/decorator/role.decorator";
import { RolesGuard } from "../../auth/guard/roles.guard";
import { JwtGuard } from "../../auth/guard/jwt.guard";
import { UserRoleEntity } from "../model/domain/user.role.entity";
import { UserUpdateCommand } from "../model/command/user.update.command";
import { UserDto } from "../model/dto/user.dto";
import { UserRegisterCommand } from "../model/command/user.register.command";
import { GetCurrentUser } from "../../auth/decorator/current.user.decorator";
import { HierarchyGuard } from "../guards/hierarchy.guard";

@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService) {}

  @Post('register')
  register(@Body() command: UserRegisterCommand): Promise<boolean> {
    return this.userService.create(command);
  }

  @HasRoles(UserRoleEntity.EMPLOYEE, UserRoleEntity.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Get('all')
  getUsers(): Promise<UserDto[]> {
    return this.userService.findAll();
  }

  @HasRoles(UserRoleEntity.EMPLOYEE, UserRoleEntity.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Get('roles')
  getRoles(): string[] {
    return Object.values(UserRoleEntity)
  }

  @UseGuards(JwtGuard, RolesGuard, HierarchyGuard)
  @Put('self_update')
  updateUser(@GetCurrentUser() user, @Body() command: UserUpdateCommand): Promise<UserDto> {
    return this.userService.selfUpdate(user, command);
  }

  @HasRoles(UserRoleEntity.ADMIN, UserRoleEntity.EMPLOYEE)
  @UseGuards(JwtGuard, RolesGuard, HierarchyGuard)
  @Put('update/:id')
  updateUserById(@Param('id') id: number, @Body() command: UserUpdateCommand): Promise<UserDto> {
    return this.userService.updateById(id, command);
  }

  @Get('self')
  @UseGuards(JwtGuard)
  getCurrentUser(@GetCurrentUser() user): UserDto {
    return this.userService.me(user);
  }

  @HasRoles(UserRoleEntity.EMPLOYEE, UserRoleEntity.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Get('find')
  getUsersByFiler(@Query('role') role?: string,
                  @Query('email') email?: string,
                  @Query('username') username?: string,
                  @Query('phoneNumber') phoneNumber?: string,
                  @Query('id') id?: number): Promise<UserDto[]> {
    return this.userService.find(role, email, username, phoneNumber, id);
  }
}
