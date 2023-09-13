import { forwardRef, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from './service/auth.service';
import { UserModule } from "../users/user.module";
import { RolesGuard } from "./guard/roles.guard";
import { JwtStrategy } from "./strategy/jwt.strategy";
import { AuthController } from './controller/auth.controller';
import { JwtRefreshStrategy } from "./strategy/jwt.refresh.strategy";

@Module({
  imports: [
    forwardRef(() => UserModule),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: {
          expiresIn: process.env.JWT_EXPIRATION_TIME
        },
      })
    })
  ],
  providers: [AuthService, RolesGuard, JwtStrategy, JwtRefreshStrategy],
  exports: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
