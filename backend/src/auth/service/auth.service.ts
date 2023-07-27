import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "../../users/model/domain/user.entity";
import {UserService} from "../../users/service/user.service";
import { AuthLoginCommand } from "../model/command/auth.login.command";

@Injectable()
export class AuthService {

  constructor(private readonly jwtService: JwtService,
              @Inject(forwardRef(() => UserService))
              private userService: UserService) {}

  createToken(user: User) : Promise<string> {
    return this.jwtService.signAsync({user});
  }

  login(command: AuthLoginCommand) {
    return null;
  }
}
