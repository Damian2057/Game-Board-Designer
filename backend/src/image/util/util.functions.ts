import { HttpStatus, ParseFilePipe, ParseFilePipeBuilder } from "@nestjs/common";
import { ImageEntity } from "../model/domain/image.entity";
import { ImageDto } from "../model/dto/image.dto";
import * as fs from "fs";

export function IsImageFile(): ParseFilePipe {
  return new ParseFilePipeBuilder()
    .addFileTypeValidator({
      fileType: 'image/jpg',
    })
    .addFileTypeValidator({
      fileType: 'png',
    })
    .addFileTypeValidator({
      fileType: 'jpeg',
    })
    .addFileTypeValidator({
      fileType: 'svg',
    })
    .build({
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
    })
}

export function mapImageToImageDto(image: ImageEntity) {
  return new ImageDto(
    image.id
  )
}

export function deleteFileFromDisk(path: string) {
  fs.unlinkSync(path);
}