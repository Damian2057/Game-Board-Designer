import { Controller, Get } from "@nestjs/common";
import { UserService } from "../service/user.service";

@Controller()
export class UserController {

  constructor(private readonly userService: UserService) {}

  @Get()
  getHello(): string {
    console.log(this.userService.findAll().then((users) => {
      console.log(users)
    }))
    return "Hello"
  }
}
