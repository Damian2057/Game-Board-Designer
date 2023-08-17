import { Controller, Delete, Get, Param, Post, Res, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { AnyFilesInterceptor } from "@nestjs/platform-express";
import { ImageService } from "../service/image.service";
import { Response } from "express";
import { ImageDto } from "../model/dto/image.dto";
import { ImageDownloadException } from "../../exceptions/type/image.download.exception";
import { ImageEntity } from "../model/domain/image.entity";

@Controller('image')
export class ImageController {

  constructor(private readonly imageService: ImageService) {
  }

  @Post('upload')
  @UseInterceptors(AnyFilesInterceptor())
  async uploadFile(@UploadedFiles() files: Array<Express.Multer.File>): Promise<ImageDto[]> {
    return this.imageService.storeFiles(files);
  }

  @Get('get/:id')
  async downloadFile(@Param('id') id: number,
                     @Res() res: Response) {
    try {
      const file: ImageEntity = await this.imageService.getFile(id);
      const buffer = await this.imageService.getFileBuffer(file);
      res.setHeader('Content-Type', file.mimetype);
      res.send(buffer);
    } catch (error) {
      throw new ImageDownloadException('The file could not be downloaded.');
    }
  }


  @Delete('delete/:id')
  deleteFile(@Param('id') id: number): Promise<boolean> {
    return this.imageService.deleteFile(id);
  }
}