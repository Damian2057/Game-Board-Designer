import { Body, Controller, Get, Post, Put } from "@nestjs/common";
import { CreateBoxCommand } from "../model/command/box/create.box.command";
import { BoxService } from "../service/box.service";
import { BoxDto } from "../model/dto/box.dto";
import { UpdateBoxCommand } from "../model/command/box/update.box.command";

@Controller('box')
export class BoxController {

  constructor(
    private readonly boxService: BoxService,
  ) {}

  @Post('create-new-box')
  async createNewBox(@Body() command: CreateBoxCommand): Promise<BoxDto> {
    return this.boxService.createNewBox(command);
  }

  @Get('all')
  async getAllBoxes(): Promise<BoxDto[]> {
    return this.boxService.getAllBoxes();
  }

  @Put('update-box/:boxId')
  async updateBox(@Body() command: UpdateBoxCommand, @Body('boxId') boxId: number): Promise<BoxDto> {
    return this.boxService.updateBox(command, boxId);
  }
}
