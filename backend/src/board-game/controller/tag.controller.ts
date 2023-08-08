import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { TagDto } from "../model/dto/tag.dto";
import { TagService } from "../service/tag.service";
import { CreateTagCommand } from "../model/command/create.tag.command";
import { HasRoles } from "../../auth/decorator/role.decorator";
import { UserRoleEntity } from "../../users/model/domain/user.role.entity";
import { JwtGuard } from "../../auth/guard/jwt.guard";
import { RolesGuard } from "../../auth/guard/roles.guard";
import { UpdateTagCommand } from "../model/command/update.tag.command";

@Controller('tag')
export class TagController {

  constructor(private readonly tagService: TagService) {}

  @Get('all')
  getAllTags(): Promise<TagDto[]> {
    return this.tagService.findAll();
  }

  @HasRoles(UserRoleEntity.EMPLOYEE, UserRoleEntity.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Get('find')
  getTagById(@Query('id') id?: number,
             @Query('name') name?: string): Promise<TagDto[]> {
    return this.tagService.findByFilter(id, name);
  }

  @HasRoles(UserRoleEntity.EMPLOYEE, UserRoleEntity.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Post('create')
  createTag(@Body() command: CreateTagCommand): Promise<boolean> {
    return this.tagService.create(command);
  }

  @HasRoles(UserRoleEntity.EMPLOYEE, UserRoleEntity.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Put('update/:id')
  updateTag(@Param('id') id: number, @Body() command: UpdateTagCommand): Promise<TagDto> {
    return this.tagService.updateById(id, command);
  }

  @HasRoles(UserRoleEntity.EMPLOYEE, UserRoleEntity.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Delete('delete/:id')
  deleteTag(@Param('id') id: number): Promise<boolean> {
    return this.tagService.deleteById(id);
  }
}
