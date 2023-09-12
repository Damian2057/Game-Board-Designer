import { Body, Controller, Post, UseGuards, Request, Put } from "@nestjs/common";
import { AuthService } from "../service/auth.service";
import { AuthLoginCommand } from "../model/command/auth.login.command";
import { AuthTokenDto } from "../model/dto/auth.token.dto";
import { JwtRefreshGuard } from "../guard/jwt.refresh.guard";
import { UserActivateCommand } from "../model/command/user.activate.command";

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

  @Put('activate/:code')
  async activate(@Body() command: UserActivateCommand): Promise<void> {
    return await this.authService.activate(command);
  }

}
