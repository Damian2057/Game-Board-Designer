import { Injectable } from '@nestjs/common';
import { CreateBoxCommand } from "../model/command/box/create.box.command";
import { InjectRepository } from "@nestjs/typeorm";
import { Box } from "../model/domain/box.entity";
import { Repository } from "typeorm";
import { UpdateBoxCommand } from "../model/command/box/update.box.command";

@Injectable()
export class BoxService {

  constructor(
    @InjectRepository(Box)
    private readonly boxRepository: Repository<Box>,
  ) {
  }

  createNewBox(command: CreateBoxCommand) {
    return undefined;
  }

  getAllBoxes() {
    return [];
  }

  updateBox(command: UpdateBoxCommand, boxId: number) {
    return undefined;
  }
}
