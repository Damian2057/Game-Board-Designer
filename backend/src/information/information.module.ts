import { Module } from '@nestjs/common';
import { AuthModule } from "../auth/auth.module";
import { UserModule } from "../users/user.module";
import { InformationController } from './controller/information.controller';
import { InformationService } from './service/information.service';

@Module({
  imports: [
    AuthModule,
    UserModule,
  ],
  controllers: [InformationController],
  providers: [InformationService],
})
export class InformationModule {}
