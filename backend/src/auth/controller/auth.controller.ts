import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "../service/auth.service";
import { AuthLoginCommand } from "../model/command/auth.login.command";
import { AuthTokenDto } from "../model/dto/auth.token.dto";

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() command: AuthLoginCommand): Promise<AuthTokenDto> {
    return this.authService.login(command);
  }

  @Post('refresh')
  async refresh(): Promise<AuthTokenDto> {
    return null;
  }

}
