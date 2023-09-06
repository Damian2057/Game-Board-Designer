import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Project } from "../model/domain/project.entity";
import { Repository } from "typeorm";
import { User } from "../../users/model/domain/user.entity";
import { ProjectDto } from "../model/dto/project.dto";
import { mapProjectToProjectDto } from "../util/util.functions";
import { IllegalArgumentException } from "../../exceptions/type/Illegal.argument.exception";
import { UserService } from "../../users/service/user.service";

@Injectable()
export class ProjectManagementService {

  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    private readonly userService: UserService
  ) {}

  async createNewProjectBasedOnExistingProject(user, projectId: number): Promise<ProjectDto> {
    return undefined;
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

}
