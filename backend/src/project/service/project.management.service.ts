import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Project } from "../model/domain/project.entity";
import { Repository } from "typeorm";
import { User } from "../../users/model/domain/user.entity";
import { ProjectDto } from "../model/dto/project.dto";
import { mapProjectCreateCommandToProject, mapProjectToProjectDto, deleteIdsFromObject } from "../util/util.functions";
import { IllegalArgumentException } from "../../exceptions/type/Illegal.argument.exception";
import { UserService } from "../../users/service/user.service";
import { GameService } from "../../game/service/game.service";
import { ContainerService } from "./container.service";
import { BoxService } from "./box.service";
import { ElementService } from "./element.service";
import { Game } from "../../game/model/domain/game.entity";
import { Order } from "../../order/model/domain/order.entity";
import { OrderService } from "../../order/service/order.service";
import { OrderStatus } from "../../order/model/domain/order.status.enum";

@Injectable()
export class ProjectManagementService {

  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    private readonly userService: UserService,
    private readonly gameService: GameService,
    private readonly containerService: ContainerService,
    private readonly boxService: BoxService,
    private readonly elementService: ElementService,
    private readonly orderService: OrderService,
  ) {}

  async createNewProjectBasedOnExistingProject(user, projectId: number, gameId: number): Promise<ProjectDto> {
    const project: Project = await this.getProjectById(projectId);
    let newProject: Project = mapProjectCreateCommandToProject(project);
    newProject = deleteIdsFromObject(newProject);
    await this.containerService.updatesAndFlush(newProject.containers);
    await this.elementService.updatesAndFlush(newProject.elements);
    await this.boxService.updatesAndFlush(newProject.box);
    const games: Game[] = [];
    for (const game of project.games) {
      games.push(await this.gameService.getGameById(game.id));
    }
    newProject.currentGame = await this.gameService.getGameById(gameId);
    newProject.games = games;
    newProject.user = user;
    newProject.isCompleted = false;
    newProject.isTemplate = false;
    const savedProject: Project = await this.projectRepository.save(newProject);
    return mapProjectToProjectDto(savedProject);
  }

  async getMyProjects(user: User): Promise<ProjectDto[]> {
    const projects: Project[] = await this.getAllProjectsByUserId(user.id);
    return projects.map(project => mapProjectToProjectDto(project));
  }

  async getMyCompletedProjects(user: User): Promise<ProjectDto[]> {
    const projects: Project[] = await this.getAllCompletedProjectsByUserId(user.id);
    return projects.map(project => mapProjectToProjectDto(project));
  }

  async getMyOngoingProjects(user: User): Promise<ProjectDto[]> {
    const projects: Project[] = await this.getAllOngoingProjectsByUserId(user.id);
    return projects.map(project => mapProjectToProjectDto(project));
  }

  async getAllProjectsForUser(userId: number): Promise<ProjectDto[]> {
    const projects: Project[] = await this.getAllProjectsByUserId(userId);
    return projects.map(project => mapProjectToProjectDto(project));
  }

  async getAllCompletedProjects(userId: number): Promise<ProjectDto[]> {
    const projects: Project[] = await this.getAllCompletedProjectsByUserId(userId);
    return projects.map(project => mapProjectToProjectDto(project));
  }

  async getAllOngoingProjects(userId: number): Promise<ProjectDto[]> {
    const projects: Project[] = await this.getAllOngoingProjectsByUserId(userId);
    return projects.map(project => mapProjectToProjectDto(project));
  }

  async assignProjectToUser(userId: number, projectId: number): Promise<ProjectDto> {
    const project: Project = await this.getProjectById(projectId);
    if (project.isTemplate) {
      throw new IllegalArgumentException("Cannot assign template project to user");
    }
    project.user = await this.userService.findOne(userId);
    const saved: Project = await this.projectRepository.save(project);
    return mapProjectToProjectDto(saved);
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
        user: true
      },
      where: {
        id: projectId
      }
    });
    if (!project) {
      throw new IllegalArgumentException(`Project with id ${projectId} not found`);
    }
    return project;
  }

  private async getAllProjectsByUserId(userId: number): Promise<Project[]> {
    return await this.projectRepository.find({
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
        user: true
      },
      where: {
        user: {
          id: userId
        },
      }
    });
  }

  private async getAllCompletedProjectsByUserId(userId: number): Promise<Project[]> {
    return await this.projectRepository.find({
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
        user: true
      },
      where: {
        user: {
          id: userId
        },
        isCompleted: true
      }
    });
  }

  private async getAllOngoingProjectsByUserId(userId: number): Promise<Project[]> {
    return await this.projectRepository.find({
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
        user: true
      },
      where: {
        user: {
          id: userId
        },
        isCompleted: false
      }
    });
  }

  async assignOrderToProject(user, projectId: number, orderId: number, gameId: number): Promise<ProjectDto> {
    let order: Order = await this.getOrder(orderId);
    let createProj: ProjectDto = await this.createNewProjectBasedOnExistingProject(user, projectId, gameId);
    let project: Project = await this.getProjectById(createProj.id);
    order.status = OrderStatus.IN_PROGRESS;
    project.order = await this.orderService.saveOrder(order);
    project = await this.projectRepository.save(project);
    return mapProjectToProjectDto(project);
  }

  private async getOrder(orderId: number): Promise<Order> {
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
}
