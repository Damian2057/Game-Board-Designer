import { Injectable } from '@nestjs/common';
import { Project } from "../model/domain/project.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Game } from "../../game/model/domain/game.entity";
import { CreateProjectCommand } from "../model/command/project-creator/create.project.command";
import { ProjectDto } from "../model/dto/project.dto";
import { ContainerService } from "./container.service";
import { BoxService } from "./box.service";
import { mapContainerToContainerDto, mapElementToElementDto, mapProjectToProjectDto } from "../util/util.functions";
import { UpdateProjectCommand } from "../model/command/project-management/update.project.command";
import { ImageService } from "../../image/service/image.service";

@Injectable()
export class ProjectCreatorService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(Game)
    private readonly gameRepository: Repository<Game>,
    private readonly containerService: ContainerService,
    private readonly boxService: BoxService,
    private readonly imageService: ImageService,
  ) {}

  async createNewProjectTemplate(command: CreateProjectCommand): Promise<ProjectDto> {
    await this.imageService.checkImageExists(command.imageIds);

    return undefined;
  }

  async getProjectDtoById(projectId: number): Promise<ProjectDto> {
    const project = await this.getProjectById(projectId);
    return mapProjectToProjectDto(project);
  }

  async getAllProjectsTemplate(): Promise<ProjectDto[]> {
    const projects: Project[] = await this.projectRepository.find({
      relations: {
        games: {
          tags: true,
          components: true
        },
        currentGame: {
          tags: true,
          components: true
        },
        elements: {
          properties: true,
        },
        box: {
          properties: true,
        },
        containers: {
          properties: true,
          elements: {
            properties: true,
          }
        },
      },
      where: {
        isTemplate: true
      }
    })
    return projects.map(project => mapProjectToProjectDto(project));
  }

  async getAllProjectsForGame(gameId: number): Promise<ProjectDto[]> {
    const projects: Project[] = await this.projectRepository.find({
      relations: {
        games: {
          tags: true,
          components: true
        },
        currentGame: {
          tags: true,
          components: true
        },
        elements: {
          properties: true,
        },
        box: {
          properties: true,
        },
        containers: {
          properties: true,
          elements: {
            properties: true,
          }
        },
      },
      where: {
        games: {
          id: gameId
        }
      }
    })
    return projects.map(project => mapProjectToProjectDto(project));
  }

  async getAllProjectsAndTemplates(): Promise<ProjectDto[]> {
    const projects: Project[] = await this.projectRepository.find({
      relations: {
        games: {
          tags: true,
          components: true
        },
        currentGame: {
          tags: true,
          components: true
        },
        elements: {
          properties: true,
        },
        box: {
          properties: true,
        },
        containers: {
          properties: true,
          elements: {
            properties: true,
          }
        },
      }
    })
    return projects.map(project => mapProjectToProjectDto(project));
  }

  async completeProject(projectId: number): Promise<ProjectDto> {
    let project: Project = await this.projectRepository.findOne({
      relations: {
        games: {
          tags: true,
          components: true
        },
        currentGame: {
          tags: true,
          components: true
        },
        elements: {
          properties: true,
        },
        box: {
          properties: true,
        },
        containers: {
          properties: true,
          elements: {
            properties: true,
          }
        },
      },
      where: {
        id: projectId
      }
    });
    project.isCompleted = true;
    await this.projectRepository.save(project);
    return mapProjectToProjectDto(project);
  }

  async getAllContainersByProjectId(projectId: number) {
    const project: Project = await this.getProjectById(projectId);
    return project.containers.map(container => mapContainerToContainerDto(container));
  }

  async getAllProjectElementsByProjectId(projectId: number) {
    const project: Project = await this.getProjectById(projectId);
    return project.elements.map(element => mapElementToElementDto(element));
  }

  private async getProjectById(projectId: number): Promise<Project> {
    return await this.projectRepository.findOne({
      relations: {
        games: true,
        currentGame: true,
        elements: {
          properties: true,
        },
        box: {
          properties: true,
        },
        containers: {
          properties: true,
          elements: {
            properties: true,
          }
        },
      },
      where: {
        id: projectId,
      }
    });
  }

  updateProject(command: UpdateProjectCommand, projectId: number) {
    return undefined;
  }
}
