import { forwardRef, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from './service/auth.service';
import { UserModule } from "../users/user.module";
import { JwtGuard } from "./guard/jwt.guard";
import { RolesGuard } from "./guard/roles.guard";
import { JwtStrategy } from "./strategy/jwt.strategy.guard";
import { AuthController } from './controller/auth.controller';

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
  providers: [AuthService, JwtGuard, RolesGuard, JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
