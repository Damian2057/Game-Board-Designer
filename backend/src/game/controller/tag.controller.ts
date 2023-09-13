import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { TagDto } from "../model/dto/tag.dto";
import { TagService } from "../service/tag.service";
import { CreateTagCommand } from "../model/command/create.tag.command";
import { HasRoles } from "../../auth/decorator/role.decorator";
import { UserRole } from "../../users/model/domain/user.role.enum";
import { JwtGuard } from "../../auth/guard/jwt.guard";
import { RolesGuard } from "../../auth/guard/roles.guard";
import { UpdateTagCommand } from "../model/command/update.tag.command";
import { Result } from "../../util/pojo/Result";

@Controller('tag')
export class TagController {

  constructor(private readonly tagService: TagService) {}

  @Get('all')
  getAllTags(): Promise<TagDto[]> {
    return this.tagService.findAll();
  }

  @HasRoles(UserRole.EMPLOYEE, UserRole.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Get('find')
  getTagByFilter(@Query('id') id?: number,
             @Query('name') name?: string): Promise<TagDto[]> {
    return this.tagService.find(id, name);
  }

  @HasRoles(UserRole.EMPLOYEE, UserRole.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Post('create')
  createTag(@Body() command: CreateTagCommand): Promise<TagDto> {
    return this.tagService.create(command);
  }

  @HasRoles(UserRole.EMPLOYEE, UserRole.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Put('update/:id')
  updateTag(@Param('id') id: number, @Body() command: UpdateTagCommand): Promise<TagDto> {
    return this.tagService.updateById(id, command);
  }

  @HasRoles(UserRole.EMPLOYEE, UserRole.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Delete('delete/:id')
  deleteTag(@Param('id') id: number): Promise<Result> {
    return this.tagService.deleteById(id);
  }
}
