import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { JWT_REFRESH, REFRESH_TOKEN } from "../util/const";
import * as process from "process";

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, JWT_REFRESH) {

  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField(REFRESH_TOKEN),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET
    });
  }

  async validate(payload: any) {
    return { ...payload.user };
  }
}