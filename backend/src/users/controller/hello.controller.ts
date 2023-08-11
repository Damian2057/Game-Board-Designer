import { Controller, Get } from "@nestjs/common";

@Controller()
export class HelloController {

  @Get('hello')
  hello(): string {
    return "Hello World!";
  }
}