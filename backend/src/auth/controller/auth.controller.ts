import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { AuthService } from "../service/auth.service";
import { AuthLoginCommand } from "../model/command/auth.login.command";
import { AuthRegisterCommand } from "../model/command/auth.register.command";
import { AuthTokenDto } from "../model/dto/auth.token.dto";
import { JwtGuard } from "../guard/jwt.guard";

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() command: AuthLoginCommand): Promise<AuthTokenDto> {
    return null;
  }

  @Post('register')
  register(@Body() command: AuthRegisterCommand): Promise<boolean> {
    return this.authService.register(command);
  }

  @Post('refresh')
  @UseGuards(JwtGuard)
  refresh(): Promise<AuthTokenDto> {
    return null;
  }

}
