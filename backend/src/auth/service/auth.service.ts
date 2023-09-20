import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "../../users/model/domain/user.entity";
import {UserService} from "../../users/service/user.service";
import { AuthLoginCommand } from "../model/command/auth.login.command";
import { AuthTokenDto } from "../model/dto/auth.token.dto";
import * as process from "process";
import { IncorrectLoginCredentialsException } from "../../exceptions/type/incorrect.login.credentials.exception";
import { comparePasswords } from "../util/util.functions";
import { mapUserToUserDto } from "../../users/util/util.functions";

@Injectable()
export class AuthService {

  constructor(private readonly jwtService: JwtService,
              @Inject(forwardRef(() => UserService))
              private userService: UserService
  ) {}

  async login(command: AuthLoginCommand): Promise<AuthTokenDto> {
    const user = await this.userService.findOneByEmail(command.email);
    if (user && await comparePasswords(command.password, user.password) && user.isActive) {
      return new AuthTokenDto(process.env.JWT_EXPIRATION_TIME,
        await this.createToken(user),
        await this.refresh(user),
        mapUserToUserDto(user));
    }
    throw new IncorrectLoginCredentialsException();
  }

  async refreshToken(user: User): Promise<AuthTokenDto> {
    return new AuthTokenDto(process.env.JWT_EXPIRATION_TIME,
      await this.createToken(user));
  }

  private createToken(user: User) : Promise<string> {
    return this.jwtService.signAsync({user});
  }

  private async refresh(user: User): Promise<string> {
    return this.jwtService.signAsync({
      user,
      expiresIn: process.env.JWT_REFRESH_EXPIRATION_TIME});
  }
}
