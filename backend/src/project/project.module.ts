import { Module } from '@nestjs/common';
import { ProjectController } from './controller/project.controller';
import { ProjectService } from './service/project.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Game } from "../game/model/domain/game.entity";
import { Component } from "../game/model/domain/component";
import { Project } from "./model/domain/project";
import { Property } from "./model/domain/property";
import { GameModule } from "../game/game.module";
import { AuthModule } from "../auth/auth.module";
import { UserModule } from "../users/user.module";
import { ComponentController } from './controller/component.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Game, Component, Project, Property]),
  GameModule,
  AuthModule,
  UserModule],
  controllers: [ProjectController, ComponentController],
  providers: [ProjectService]
})
export class ProjectModule {}
