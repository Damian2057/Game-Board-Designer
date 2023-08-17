import { Controller, Delete, Get, Post, Res, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { AnyFilesInterceptor } from "@nestjs/platform-express";
import { ImageService } from "../service/image.service";
import * as fs from 'fs';
import { Response } from "express";
@Controller('image')
export class ImageController {

  constructor(private readonly imageService: ImageService) {
  }

  @Post('upload')
  @UseInterceptors(AnyFilesInterceptor())
  async uploadFile(@UploadedFiles() files: Array<Express.Multer.File>, @Res() res: Response) {
    console.log(files);
    let file = files[0];
    try {
      const fileContent = await this.readFile(file.path);
      res.setHeader('Content-Type', file.mimetype);
      res.send(fileContent);
    } catch (error) {
      res.status(500).send('Error reading file');
    }
  }

  @Get('get/:id')
  async downloadFile(@Res() res: Response) {

  }


  @Delete('delete')
  deleteFile() {
    console.log('delete');
  }

  private readFile(filePath: string): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }
}