import { Injectable, Logger } from "@nestjs/common";
import * as fs from 'fs';
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { ImageEntity } from "../model/domain/image.entity";
import { ImageDto } from "../model/dto/image.dto";
import { deleteFileFromDisk, mapImageToImageDto } from "../util/util.functions";
import { ImageDownloadException } from "../../exceptions/type/image.download.exception";
import * as process from "process";

@Injectable()
export class ImageService {

  private readonly logger = new Logger(ImageService.name)

  constructor(
    @InjectRepository(ImageEntity)
    private readonly imageRepository: Repository<ImageEntity>,
  ) {
  }

  async storeFiles(files: Array<Express.Multer.File>): Promise<ImageDto[]> {
    const images: ImageEntity[] = [];
    this.logger.debug(`Store: ${files.length} files`);
    try {
      for (const file of files) {
        const image = new ImageEntity(file.filename, file.mimetype);
        await this.imageRepository.save(image);
        images.push(image);
      }
    } catch (error) {
      this.logger.error(error.message);
      throw new ImageDownloadException(error.message);
    }
    this.logger.debug(`Successfully stored: ${files.length} files`);
    return images.map(image => mapImageToImageDto(image));
  }

  async getFile(id: number): Promise<ImageEntity> {
    this.logger.debug(`Get file with id ${id}`);
    const file: ImageEntity = await this.imageRepository.findOneBy({ id: id });
    if (!file) {
      throw new ImageDownloadException(`The file with the id ${id} does not exist.`);
    }
    return await this.imageRepository.findOneBy({ id: id });
  }

  async deleteFile(id: number): Promise<boolean> {
    this.logger.debug(`Attempt to delete file with ID: ${id}`);
    const file: ImageEntity = await this.imageRepository.findOneBy({ id: id });
    if (!file) {
      this.logger.error(`The file with the id ${id} does not exist.`);
      throw new ImageDownloadException(`The file with the id ${id} does not exist.`);
    }
    await this.imageRepository.delete({ id: id });
    const path = `${process.env.MULTER_STORAGE_PATH}\\${file.filename}`;
    deleteFileFromDisk(path);
    return Promise.resolve(true);
  }

  async getFileBuffer(file: ImageEntity) {
    this.logger.debug(`The file with the ${file.filename} is being downloaded.`);
    const path = `${process.env.MULTER_STORAGE_PATH}\\${file.filename}`;
    return new Promise((resolve, reject) => {
      fs.readFile(path, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }
}
