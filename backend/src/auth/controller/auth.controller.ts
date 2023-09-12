import { Body, Controller, Post, UseGuards, Request } from "@nestjs/common";
import { AuthService } from "../service/auth.service";
import { AuthLoginCommand } from "../model/command/auth.login.command";
import { AuthTokenDto } from "../model/dto/auth.token.dto";
import { JwtRefreshGuard } from "../guard/jwt.refresh.guard";

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() command: AuthLoginCommand): Promise<AuthTokenDto> {
    return this.authService.login(command);
  }

  @Post('refresh')
  @UseGuards(JwtRefreshGuard)
  async refresh(@Request() req): Promise<AuthTokenDto> {
    return await this.authService.refreshToken(req.user);
  }

}
