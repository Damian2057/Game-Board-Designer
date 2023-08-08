import { Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { TagDto } from "../model/dto/tag.dto";

@Controller('tag')
export class TagController {

  @Get('all')
  getAllTags(): TagDto[] {
    return null;
  }

  @Get('find')
  getTagById(@Query('id') id?: number,
             @Query('name') name?: string): TagDto {
    return null;
  }

  @Post('create')
  createTag(): TagDto {
    return null;
  }

  @Put('update/:id')
  updateTag(@Param('id') id: number): TagDto {
    return null
  }

  @Delete('delete/:id')
  deleteTag(@Param('id') id: number): boolean {
    return true;
  }
}
