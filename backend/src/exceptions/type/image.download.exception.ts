import { HttpException, HttpStatus } from "@nestjs/common";

export class ImageDownloadException extends HttpException {
    constructor(s: string) {
        super(s, HttpStatus.UNPROCESSABLE_ENTITY);
    }
}