import { Module } from '@nestjs/common';
import { ForbiddenException } from "./type/forbidden.exception";
import { UnauthorizedException } from "./type/unauthorized.exception";

@Module({
  providers: [ForbiddenException, UnauthorizedException],
  exports: [ForbiddenException, UnauthorizedException],
})
export class ExceptionsModule {}
