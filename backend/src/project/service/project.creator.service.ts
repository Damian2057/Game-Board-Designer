import { Injectable } from "@nestjs/common";
import { Project } from "../model/domain/project.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Game } from "../../game/model/domain/game.entity";
import { CreateProjectCommand } from "../model/command/project-creator/create.project.command";
import { ProjectDto } from "../model/dto/project.dto";
import { ContainerService } from "./container.service";
import { BoxService } from "./box.service";
import {
  mapContainerToContainerDto,
  mapElementToElementDto,
  mapProjectCreateCommandToProject,
  mapProjectToProjectDto
} from "../util/util.functions";
import { UpdateProjectCommand } from "../model/command/project-creator/update.project.command";
import { ImageService } from "../../image/service/image.service";
import { IllegalArgumentException } from "../../exceptions/type/Illegal.argument.exception";
import { ElementService } from "./element.service";
import { GameService } from "../../game/service/game.service";
import { OrderService } from "../../order/service/order.service";
import { Order } from "../../order/model/domain/order.entity";
import { paginate, Pagination } from "nestjs-typeorm-paginate";

@Injectable()
export class ProjectCreatorService {

  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    private readonly gameService: GameService,
    private readonly containerService: ContainerService,
    private readonly boxService: BoxService,
    private readonly elementService: ElementService,
    private readonly imageService: ImageService,
    private readonly orderService: OrderService,
  ) {}

  async createNewProjectTemplate(command: CreateProjectCommand): Promise<ProjectDto> {
    await this.imageService.checkImageExists(command.imageIds);
    const project: Project = mapProjectCreateCommandToProject(command);
    await this.containerService.updatesAndFlush(project.containers);
    await this.elementService.updatesAndFlush(project.elements);
    await this.boxService.updatesAndFlush(project.box);
    const games: Game[] = [];
    for (const game of command.games) {
      games.push(await this.gameService.getGameById(game.id));
    }
    project.games = games;
    if (command.order) {
      project.order = await this.assignOrderToProject(command.order.id);
    }

    const savedProject: Project = await this.projectRepository.save(project);
    return mapProjectToProjectDto(savedProject);
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
        order: true,
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
        order: true,
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
        order: true,
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
        order: true,
      },
      where: {
        id: projectId
      }
    });
    if (!project) {
      throw new IllegalArgumentException(`Project with id ${projectId} not found`);
    }
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
    const project: Project = await this.projectRepository.findOne({
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
        order: true,
      },
      where: {
        id: projectId,
      }
    });
    if (!project) {
      throw new IllegalArgumentException(`Project with id ${projectId} not found`);
    }
    return project;
  }

  async updateProject(command: UpdateProjectCommand, projectId: number) {
    await this.imageService.checkImageExists(command.imageIds);
    let project: Project = await this.getProjectById(projectId);
    project = await this.updateNotNullFields(command, project);
    const updatedProject: Project = await this.projectRepository.save(project);
    return mapProjectToProjectDto(updatedProject);
  }

  private async getProjectByName(projectName: string): Promise<Project> {
    return await this.projectRepository.findOne({
      where: {
        name: projectName,
      }
    });
  }

  private async updateNotNullFields(command: UpdateProjectCommand, project: Project): Promise<Project> {
    if (command.name) {
      project.name = command.name;
    }
    if (command.description) {
      project.description = command.description;
    }
    if (command.notes) {
      project.notes = command.notes;
    }
    if (command.imageIds) {
      project.imageIds = command.imageIds;
    }
    if (command.games) {
      const games: Game[] = [];
      for (const game of command.games) {
        games.push(await this.gameService.getGameById(game.id));
      }
      project.games = games;
    }
    if (command.isTemplate) {
      project.isTemplate = command.isTemplate;
    }
    if (command.isCompleted) {
      project.isCompleted = command.isCompleted;
    }

    return project;
  }

  private async assignOrderToProject(orderId: number): Promise<Order> {
    const project: Project = await this.projectRepository.findOne({
      relations: {
        order: true,
      },
      where: {
        order: {
          id: orderId
        }
      }
    });
    if (project == null) {
      return await this.orderService.getOrderById(orderId);
    }
    throw new IllegalArgumentException(`Order with id ${orderId} already assigned to project`);
  }

  async findPagedProjects(page: number,
                          limit: number,
                          isTemplate: boolean,
                          isCompleted: boolean,
                          workerId: number,
                          title: string): Promise<Pagination<ProjectDto>> {
    const queryBuilder = this.projectRepository.createQueryBuilder('project')
    queryBuilder.leftJoinAndSelect('project.order', 'order')
    queryBuilder.leftJoinAndSelect('project.elements', 'elements')
    queryBuilder.leftJoinAndSelect('project.containers', 'containers')
    queryBuilder.leftJoinAndSelect('project.box', 'box')
    queryBuilder.leftJoinAndSelect('project.games', 'games')
    queryBuilder.leftJoinAndSelect('project.currentGame', 'currentGame')
    if (isTemplate != undefined) {
      queryBuilder.andWhere('project.isTemplate = :isTemplate', { isTemplate: isTemplate })
    }
    if (isCompleted != undefined) {
      queryBuilder.andWhere('project.isCompleted = :isCompleted', { isCompleted: isCompleted })
    }
    if (workerId != undefined) {
      queryBuilder.andWhere('project.user.id = :workerId', { workerId: workerId })
    }
    if (title != undefined) {
      queryBuilder.andWhere('games.title = :title', { title })
    }
    const pages = await paginate<Project>(queryBuilder, { page, limit });

    return new Pagination<ProjectDto>(pages.items.map(game => mapProjectToProjectDto(game)), pages.meta);
  }
}
