import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "../../users/model/domain/user.entity";
import {AuthRegisterCommand} from "../model/command/auth.register.command";
import {UserService} from "../../users/service/user.service";
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {

  constructor(private readonly jwtService: JwtService,
              @Inject(forwardRef(() => UserService))
              private userService: UserService) {}

  createToken(user: User) : Promise<String> {
    return this.jwtService.signAsync({user});
  }

  hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  comparePasswords(newPassword: string, passwordHash: string): Promise<any>{
    return bcrypt.compare(newPassword, passwordHash);
  }

  async register(command: AuthRegisterCommand) {
        return Promise.resolve(false);
  }
}
