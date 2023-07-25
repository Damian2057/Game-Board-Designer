import { Injectable } from '@nestjs/common';
import { JwtService } from "@nestjs/jwt";
import { User } from "../../users/model/domain/user.entity";
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {

  constructor(private readonly jwtService: JwtService) {}

  createToken(user: User) : Promise<String> {
    return this.jwtService.signAsync({user});
  }

  hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  comparePasswords(newPassword: string, passwordHash: string): Promise<any>{
    return bcrypt.compare(newPassword, passwordHash);
  }
}
