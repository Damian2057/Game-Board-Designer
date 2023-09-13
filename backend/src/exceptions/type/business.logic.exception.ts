import { HttpException, HttpStatus } from "@nestjs/common";

export class BusinessLogicException extends HttpException {

  constructor(s: string) {
    super(s, HttpStatus.NOT_ACCEPTABLE);
  }
}