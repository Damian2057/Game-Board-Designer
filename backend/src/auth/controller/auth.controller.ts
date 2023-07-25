import { Controller, Post } from "@nestjs/common";
import { AuthService } from "../service/auth.service";

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login() {
    return 'login';
  }

  @Post('register')
  register() {
    return 'register';
  }

  @Post('refresh')
  refresh() {
    return 'refresh';
  }

}
