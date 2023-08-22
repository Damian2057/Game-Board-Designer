import { Controller, Get, Post, Put } from "@nestjs/common";

@Controller('box')
export class BoxController {

  @Post('create-new-box')
  async createNewBox() {

  }

  @Get('all')
  async getAllBoxes() {

  }

  @Put('update-box/:boxId')
  async updateBox() {

  }
}
