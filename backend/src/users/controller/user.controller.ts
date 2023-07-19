import { Controller, Get } from "@nestjs/common";
import { UserService } from "../service/user.service";
import { ForbiddenException } from "../../exceptions/type/forbidden.exception";

@Controller()
export class UserController {

  constructor(private readonly userService: UserService) {}

  @Get()
  getHello(): string {
    return "Hello World!";
  }
}
