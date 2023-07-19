import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from "@nestjs/config";
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { BoardGameModule } from './board-game/board-game.module';
import { BoardSchemaModule } from './board-schema/board-schema.module';

@Module({
  imports: [ConfigModule.forRoot(),
    UsersModule,
    PrismaModule,
    AuthModule,
    BoardGameModule,
    BoardSchemaModule],
  controllers: [],
  providers: []
})
export class AppModule {}