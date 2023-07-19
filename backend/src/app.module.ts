import { Module } from '@nestjs/common';
import { UserModule } from './users/user.module';
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from './auth/auth.module';
import { BoardGameModule } from './board-game/board-game.module';
import { BoardSchemaModule } from './board-schema/board-schema.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [ConfigModule.forRoot(),
    UserModule,
    AuthModule,
    BoardGameModule,
    BoardSchemaModule,
    DatabaseModule],
  controllers: [],
  providers: []
})
export class AppModule {}