import { Injectable } from '@nestjs/common';
import { CreateBoxCommand } from "../model/command/box/create.box.command";
import { InjectRepository } from "@nestjs/typeorm";
import { Box } from "../model/domain/box.entity";
import { Repository } from "typeorm";
import { UpdateBoxCommand } from "../model/command/box/update.box.command";
import { ImageService } from "../../image/service/image.service";
import { mapBoxToBoxDto } from "../util/util.functions";
import { BoxDto } from "../model/dto/box.dto";
import { IllegalArgumentException } from "../../exceptions/type/Illegal.argument.exception";

@Injectable()
export class BoxService {

  constructor(
    @InjectRepository(Box)
    private readonly boxRepository: Repository<Box>,
    private readonly imageService: ImageService
  ) {
  }

  async createNewBox(command: CreateBoxCommand): Promise<BoxDto> {
    await this.imageService.checkImageExists(command.imageIds);
    return mapBoxToBoxDto(await this.boxRepository.save(command));
  }

  async getAllBoxes(): Promise<BoxDto[]> {
    const boxes: Box[] = await this.boxRepository.find({
      relations: {
        properties: true,
      }
    });
    return boxes.map(box => mapBoxToBoxDto(box));
  }

  async updateBox(command: UpdateBoxCommand, boxId: number): Promise<BoxDto> {
    let box: Box = await this.getBoxById(boxId);
    box = this.updateNotNullFields(command, box);
    const updatedBox: Box = await this.boxRepository.save(box);
    return mapBoxToBoxDto(updatedBox);
  }

  async getBoxDtoById(id: number): Promise<BoxDto> {
    const box: Box = await this.getBoxById(id);
    return mapBoxToBoxDto(box);
  }

  private updateNotNullFields(command: UpdateBoxCommand, box: Box): Box {
    if (command.name) {
      box.name = command.name;
    }
    if (command.description) {
      box.description = command.description;
    }
    if (command.notes) {
      box.notes = command.notes;
    }
    if (command.imageIds) {
      box.imageIds = command.imageIds;
    }

    return box;
  }

  private async getBoxById(id: number): Promise<Box> {
    const box: Box = await this.boxRepository.findOne({
      relations: {
        properties: true,
      },
      where: {id: id}
    });
    if (box == null) {
      throw new IllegalArgumentException(`Box with id ${id} does not exist.`)
    }
    return box;
  }
}
