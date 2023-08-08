import { HttpException, HttpStatus } from "@nestjs/common";

export class DuplicateKeyParameterException extends HttpException {

  constructor(s: string) {
    super(s, HttpStatus.NOT_ACCEPTABLE);
  }
}