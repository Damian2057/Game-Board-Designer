import { HttpStatus, ParseFilePipe, ParseFilePipeBuilder } from "@nestjs/common";

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