import { Module } from '@nestjs/common';
import { ForbiddenException } from "./type/forbidden.exception";

@Module({
  providers: [ForbiddenException],
  exports: [ForbiddenException],
})
export class ExceptionsModule {}
