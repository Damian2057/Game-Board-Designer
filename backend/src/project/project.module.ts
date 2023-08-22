import { Module } from '@nestjs/common';
import { ProjectCreatorController } from './controller/project.creator.controller';
import { ProjectService } from './service/project.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Game } from "../game/model/domain/game.entity";
import { Component } from "../game/model/domain/component";
import { Project } from "./model/domain/project.entity";
import { Property } from "./model/domain/property.entity";
import { GameModule } from "../game/game.module";
import { AuthModule } from "../auth/auth.module";
import { UserModule } from "../users/user.module";
import { ElementController } from './controller/element.controller';
import { Container } from "./model/domain/container.entity";
import { Element } from "./model/domain/element.entity";
import { Box } from "./model/domain/box.entity";
import { ImageModule } from "../image/image.module";
import { BoxService } from './service/box.service';
import { BoxController } from './controller/box.controller';
import { PriorityController } from './controller/priority.controller';
import { StatusController } from './controller/status.controller';
import { PriorityService } from './service/priority.service';
import { StatusService } from './service/status.service';
import { ProjectManagementController } from './controller/project.management.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Game, Component, Project, Container, Element, Property, Box]),
  GameModule,
  AuthModule,
  UserModule,
  ImageModule],
  controllers: [ProjectCreatorController, ElementController, BoxController, PriorityController, StatusController, ProjectManagementController],
  providers: [ProjectService, BoxService, PriorityService, StatusService]
})
export class ProjectModule {}
