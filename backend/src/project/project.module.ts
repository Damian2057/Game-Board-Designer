import { Module } from '@nestjs/common';
import { ProjectController } from './controller/project.controller';
import { ProjectService } from './service/project.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Game } from "../game/model/domain/game";
import { Element } from "../game/model/domain/element";
import { Project } from "./model/domain/project";
import { Component } from "./model/domain/component";
import { Property } from "./model/domain/property";
import { GameModule } from "../game/game.module";
import { AuthModule } from "../auth/auth.module";
import { UserModule } from "../users/user.module";
import { ComponentController } from './controller/component.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Game, Element, Project, Component, Property]),
  GameModule,
  AuthModule,
  UserModule],
  controllers: [ProjectController, ComponentController],
  providers: [ProjectService]
})
export class ProjectModule {}
