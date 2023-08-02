import { HttpException, HttpStatus } from "@nestjs/common";

export class UserAlreadyExistsException extends HttpException {

  constructor(s: string) {
    super(s, HttpStatus.NOT_ACCEPTABLE);
  }
}