import { Controller, Get, Param, Post } from "@nestjs/common";
import { BoardSchemaService } from "../service/board-schema.service";

@Controller('board-schema')
export class BoardSchemaController {

  constructor(
    private readonly boardSchemaService: BoardSchemaService,
  ) {
  }

  @Post('create-schema-from-template/:boardGameId')
  async createSchemaFromTemplate(@Param('boardGameId') boardGameId: number) {

  }

  @Post('create-template')
  async createTemplate() {

  }

  @Get('templates')
  async getTemplates() {

  }

  @Get('schema/:schemaId')
  async getTemplate(@Param('schemaId') templateId: number) {

  }

  @Get('no-assigned')
  async getNoAssigned() {

  }

  @Get('assigned')
  async getAssigned() {

  }

  @Get('assigned/:userId')
  async getAssignedForUser(@Param('userId') userId: number) {

  }

}
