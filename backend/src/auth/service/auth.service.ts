import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "../../users/model/domain/user.entity";
import {UserService} from "../../users/service/user.service";
import { AuthLoginCommand } from "../model/command/auth.login.command";
import { AuthTokenDto } from "../model/dto/auth.token.dto";
import * as process from "process";
import { IncorrectLoginCredentialsException } from "../../exceptions/type/incorrect.login.credentials.exception";
import { comparePasswords } from "../util/util.functions";

@Injectable()
export class AuthService {

  constructor(private readonly jwtService: JwtService,
              @Inject(forwardRef(() => UserService))
              private userService: UserService) {}

  createToken(user: User) : Promise<string> {
    return this.jwtService.signAsync({user});
  }

  async login(command: AuthLoginCommand) {
    const user = await this.userService.findOneByUsername(command.username);
    if (user && await comparePasswords(command.password, user.password)) {
      return new AuthTokenDto(process.env.JWT_EXPIRATION_TIME, await this.createToken(user));
    }
    throw new IncorrectLoginCredentialsException();
  }
}
