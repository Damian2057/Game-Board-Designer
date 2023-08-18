import { Controller, Get, Param, Post, Put } from "@nestjs/common";
import { BoardSchemaService } from "../service/board-schema.service";

@Controller('board-schema')
export class BoardSchemaController {

  constructor(
    private readonly boardSchemaService: BoardSchemaService,
  ) {
  }

  @Post('start-project/:templateId')
  async startNewSchemaBasedOnTemplate(@Param('templateId') templateId: number) {

  }

  @Post('create-new-Schema')
  async createCompletelyNewSchema() {

  }

  /**
   * This method init elements based on board game elements
   * @param boardGameId
   */
  @Post('init-new-Schema/:boardGameId')
  async initNewSchemaBasedOnBoardGameElements(@Param('boardGameId') boardGameId: number) {

  }

  @Get('schemas')
  async getSchemas() {

  }

  @Get('schema/:schemaId')
  async getSchemaById(@Param('schemaId') templateId: number) {

  }

  @Get('no-assigned')
  async getNoAssigned() {

  }

  @Get('assigned')
  async getAssignedToCurrentUser() {

  }

  @Put('assign/:schemaId')
  async assign(@Param('schemaId') schemaId: number) {

  }

  @Get('assigned/:userId')
  async getAssignedForUser(@Param('userId') userId: number) {

  }

}
