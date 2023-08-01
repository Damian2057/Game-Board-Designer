import { HttpException, HttpStatus } from "@nestjs/common";

export class IncorrectLoginCredentialsException extends HttpException {
  constructor() {
    super('Incorrect login Credentials', HttpStatus.NOT_FOUND);
  }
}