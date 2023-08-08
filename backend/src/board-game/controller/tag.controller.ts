import { Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { TagDto } from "../model/dto/tag.dto";

@Controller('tag')
export class TagController {

  @Get('all')
  getAllTags(): TagDto[] {
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
