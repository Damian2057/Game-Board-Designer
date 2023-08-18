import { Module } from '@nestjs/common';
import { BoardSchemaController } from './controller/board-schema.controller';
import { BoardSchemaService } from './service/board-schema.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Game } from "../game/model/domain/game.entity";
import { ElementEntity } from "../game/model/domain/element.entity";
import { BoardSchemaEntity } from "./model/domain/board-schema.entity";
import { SchemaElementEntity } from "./model/domain/schema.element.entity";
import { ParameterEntity } from "./model/domain/parameter.entity";
import { GameModule } from "../game/game.module";
import { AuthModule } from "../auth/auth.module";
import { UserModule } from "../users/user.module";
import { SchemaElementController } from './controller/schema.element.controller';
import { ParameterController } from './controller/parameter.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Game, ElementEntity, BoardSchemaEntity, SchemaElementEntity, ParameterEntity]),
  GameModule,
  AuthModule,
  UserModule],
  controllers: [BoardSchemaController, SchemaElementController, ParameterController],
  providers: [BoardSchemaService]
})
export class BoardSchemaModule {}
