import { Module } from '@nestjs/common';
import { ProjectController } from './controller/project.controller';
import { ProjectService } from './service/project.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { GameEntity } from "../game/model/domain/game.entity";
import { ElementEntity } from "../game/model/domain/element.entity";
import { ProjectEntity } from "./model/domain/project.entity";
import { ComponentEntity } from "./model/domain/component.entity";
import { PropertyEntity } from "./model/domain/property.entity";
import { GameModule } from "../game/game.module";
import { AuthModule } from "../auth/auth.module";
import { UserModule } from "../users/user.module";
import { ComponentController } from './controller/component.controller';

@Module({
  imports: [TypeOrmModule.forFeature([GameEntity, ElementEntity, ProjectEntity, ComponentEntity, PropertyEntity]),
  GameModule,
  AuthModule,
  UserModule],
  controllers: [ProjectController, ComponentController],
  providers: [ProjectService]
})
export class ProjectModule {}
