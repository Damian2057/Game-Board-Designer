import { Injectable } from '@nestjs/common';
import { Project } from "../model/domain/project.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Element } from "../model/domain/element.entity";
import { Property } from "../model/domain/property.entity";
import { Repository } from "typeorm";
import { Game } from "../../game/model/domain/game.entity";
import { Box } from "../model/domain/box.entity";
import { CreateProjectCommand } from "../model/command/project-creator/create.project.command";
import { ProjectDto } from "../model/dto/project.dto";

@Injectable()
export class ProjectCreatorService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(Game)
    private readonly gameRepository: Repository<Game>,
    @InjectRepository(Box)
    private readonly boxRepository: Repository<Box>,
    @InjectRepository(Element)
    private readonly elementRepository: Repository<Element>,
    @InjectRepository(Property)
    private readonly propertyRepository: Repository<Property>,
  ) {}

  createNewProjectTemplate(command: CreateProjectCommand) {
    return undefined;
  }

  async findOne(id: number): Promise<ProjectDto> {
    return null;
  }

  getProjectById(projectId: number) {
    return undefined;
  }

  getAllProjectsTemplate() {
    return [];
  }

  getAllProjectsForGame(gameId: number) {
    return [];
  }

  getAllProjectsAndTemplates() {
    return [];
  }

  completeProject(projectId: number) {
    return undefined;
  }

  getAllContainersByProjectId(projectId: number) {
    return [];
  }

  getAllProjectElementsByProjectId(projectId: number) {
    return [];
  }
}
