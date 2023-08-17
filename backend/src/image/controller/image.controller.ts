import { Controller, Delete, Post, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { AnyFilesInterceptor } from "@nestjs/platform-express";
import { ImageService } from "../service/image.service";

@Controller('image')
export class ImageController {

  constructor(private readonly imageService: ImageService) {
  }

  @Post('upload')
  @UseInterceptors(AnyFilesInterceptor())
  uploadFile(@UploadedFiles() files: Array<Express.Multer.File>) {
    console.log(files);
  }

  @Delete('delete')
  deleteFile() {
    console.log('delete');
  }
}