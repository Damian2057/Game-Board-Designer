import { AuthGuard } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { JWT } from "../const";

@Injectable()
export class JwtGuard extends AuthGuard(JWT) {
}