import { Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { InjectRepository } from "@nestjs/typeorm";
import { ImageEntity } from "../model/domain/image.entity";
import { Repository } from "typeorm";
import { GameEntity } from "../../game/model/domain/game.entity";
import * as process from "process";
import { deleteFileFromDisk } from "../util/util.functions";

@Injectable()
export class ImageScheduler {

  private readonly logger = new Logger(ImageScheduler.name);

  constructor(
    @InjectRepository(ImageEntity)
    private readonly imageRepository: Repository<ImageEntity>,
    @InjectRepository(GameEntity)
    private readonly boardGameRepository: Repository<GameEntity>,
  ) {
  }

  @Cron(CronExpression.EVERY_WEEK)
  async deleteUnusedImages() {
    const imagesToDelete = await this.getImagesToDelete();
    this.logger.debug(`Found ${imagesToDelete.length} images to delete`);

    imagesToDelete.forEach(async image => {
      await this.imageRepository.delete(image.id);
      const path = `${process.env.MULTER_STORAGE_PATH}\\${image.filename}`;
      deleteFileFromDisk(path);
      this.logger.debug(`Deleted image with id: ${image.id}`);
    });
  }

  private async getImagesToDelete(): Promise<ImageEntity[]> {
    const images: ImageEntity[] = await this.imageRepository.find();
    const boardGames: GameEntity[] = await this.boardGameRepository.find();
    const usedImageIds = new Set<number>();

    boardGames.forEach(boardGame => {
      if (boardGame.imageIds) {
        boardGame.imageIds.forEach(imageId => {
          usedImageIds.add(imageId);
        });
      }
    });
    return images.filter(image => !usedImageIds.has(image.id));
  }
}
