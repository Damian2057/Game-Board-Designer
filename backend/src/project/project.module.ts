import { Module } from '@nestjs/common';
import { ProjectCreatorController } from './controller/project.creator.controller';
import { ProjectCreatorService } from './service/project.creator.service';
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
import { ProjectManagementService } from './service/project.management.service';
import { ContainerService } from './service/container.service';
import { ElementService } from "./service/element.service";
import { ContainerController } from "./controller/container.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Game, Component, Project, Container, Element, Property, Box]),
  GameModule,
  AuthModule,
  UserModule,
  ImageModule,
  GameModule],
  controllers: [ProjectCreatorController, ElementController, BoxController, PriorityController, StatusController, ProjectManagementController, ContainerController],
  providers: [ProjectCreatorService, BoxService, PriorityService, StatusService, ProjectManagementService, ContainerService, ElementService]
})
export class ProjectModule {}
