import { AuthGuard } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { JWT_REFRESH } from "../util/const";

@Injectable()
export class JwtRefreshGuard extends AuthGuard(JWT_REFRESH) {
}