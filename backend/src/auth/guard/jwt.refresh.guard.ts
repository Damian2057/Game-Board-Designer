import { AuthGuard } from "@nestjs/passport";
import { JWT_REFRESH } from "../util/const";

export class JwtRefreshGuard extends AuthGuard(JWT_REFRESH) {
}