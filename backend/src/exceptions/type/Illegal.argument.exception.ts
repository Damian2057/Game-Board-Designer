import { HttpException, HttpStatus } from "@nestjs/common";

export class IllegalArgumentException extends HttpException {

  constructor(s: string) {
    super(s, HttpStatus.NOT_ACCEPTABLE);
  }
}