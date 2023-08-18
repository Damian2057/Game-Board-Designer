import { Module } from '@nestjs/common';
import { BoardSchemaController } from './controller/board-schema.controller';
import { BoardSchemaService } from './service/board-schema.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { BoardGame } from "../board-game/model/domain/board-game.entity";
import { GameElement } from "../board-game/model/domain/game.element.entity";
import { BoardSchemaEntity } from "./model/domain/board-schema.entity";
import { SchemaElementEntity } from "./model/domain/schema.element.entity";
import { ParameterEntity } from "./model/domain/parameter.entity";
import { BoardGameModule } from "../board-game/board-game.module";
import { AuthModule } from "../auth/auth.module";
import { UserModule } from "../users/user.module";
import { SchemaElementController } from './controller/schema.element.controller';
import { ParameterController } from './controller/parameter.controller';

@Module({
  imports: [TypeOrmModule.forFeature([BoardGame, GameElement, BoardSchemaEntity, SchemaElementEntity, ParameterEntity]),
  BoardGameModule,
  AuthModule,
  UserModule],
  controllers: [BoardSchemaController, SchemaElementController, ParameterController],
  providers: [BoardSchemaService]
})
export class BoardSchemaModule {}
