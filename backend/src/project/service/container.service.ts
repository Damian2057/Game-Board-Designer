import { Injectable } from "@nestjs/common";
import { UpdateContainerCommand } from "../model/command/container/update.container.command";
import { Repository } from "typeorm";
import { Container } from "../model/domain/container.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateContainerCommand } from "../model/command/container/create.container.command";
import { IllegalArgumentException } from "../../exceptions/type/Illegal.argument.exception";
import {
  mapContainerCommandToContainer,
  mapContainerToContainerDto,
  mapElementDtoToElement,
  mapElementToElementDto,
  mapPropertyDtoToProperty
} from "../util/util.functions";
import { ElementDto } from "../model/dto/element.dto";
import { ElementService } from "./element.service";
import { ImageService } from "../../image/service/image.service";
import { ContainerDto } from "../model/dto/container.dto";
import { Project } from "../model/domain/project.entity";
import { Property } from "../model/domain/property.entity";
import { Result } from "../../util/pojo/Result";

@Injectable()
export class ContainerService {

  constructor(
    @InjectRepository(Container)
    private readonly containerRepository: Repository<Container>,
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(Property)
    private readonly propertyRepository: Repository<Property>,
    private readonly elementService: ElementService,
    private readonly imageService: ImageService,
  ) {
  }

  async updateContainer(command: UpdateContainerCommand, containerId: number): Promise<ContainerDto> {
    await this.imageService.checkImageExists(command.imageIds);
    let container = await this.getContainerById(containerId);
    container = this.updateNotNullFields(command, container);
    const updatedContainer: Container = await this.updateAndFlush(container);
    return mapContainerToContainerDto(updatedContainer);
  }

  async getContainerDtoById(containerId: number): Promise<ContainerDto> {
    const container: Container = await this.getContainerById(containerId);
    return mapContainerToContainerDto(container);
  }

  async deleteContainerById(containerId: number): Promise<Result> {
    const result = await this.containerRepository.delete(containerId);
    if (result.affected > 0) {
      return new Result(result);
    }
    throw new IllegalArgumentException(`Container with id: ${containerId} does not exist!`);
  }

  async deleteAllContainersByProjectId(projectId: number): Promise<Result> {
    let project = await this.getProjectByProjectId(projectId);
    const affected: Result[] = []
    for (const container of project.containers) {
      affected.push(await this.deleteContainerById(container.id));
    }
    const allSuccessful = affected.every(result => result.result === "success");
    return allSuccessful ? new Result({affected: 1}) : new Result({affected: 0});
  }

  async addContainer(command: CreateContainerCommand, projectId: number): Promise<ContainerDto[]> {
    await this.imageService.checkImageExists(command.imageIds);
    const project: Project = await this.getProjectByProjectId(projectId);
    if (!project) {
      throw new IllegalArgumentException(`Project with id: ${projectId} does not exist!`);
    }
    const container: Container = mapContainerCommandToContainer(command);
    await this.updateAndFlush(container);
    if (!project.containers) {
      project.containers = [];
    }
    project.containers.push(container);
    const result: Project = await this.projectRepository.save(project);

    return result.containers.map(container => mapContainerToContainerDto(container));
  }

  async getProjectByProjectId(projectId: number) {
    return await this.projectRepository.findOne({
      relations: {
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

  async getAllContainerElementsByContainerId(containerId: number): Promise<ElementDto[]> {
    const container: Container = await this.getContainerById(containerId);
    return container.elements.map(element => mapElementToElementDto(element));
  }

  async updateAndFlush(container: Container): Promise<Container> {
    await this.elementService.updatesAndFlush(container.elements);
    await this.propertyRepository.save(container.properties);
    return await this.containerRepository.save(container);
  }

  async updatesAndFlush(containers: Container[]): Promise<Container[]> {
    for (const container of containers) {
      await this.updateAndFlush(container);
    }
    return containers;
  }

  private async getContainerById(containerId: number): Promise<Container> {
    const container: Container = await this.containerRepository.findOne({
      relations: {
        project: true,
        properties: true,
        elements: {
          properties: true,
        }
      },
      where: {
        id: containerId,
      }
    });
    if (!container) {
      throw new IllegalArgumentException(`Container with id ${containerId} not found`);
    }
    return container;
  }

  private updateNotNullFields(command: UpdateContainerCommand, container: Container): Container {
    if (command.name) {
      container.name = command.name;
    }
    if (command.description) {
      container.description = command.description;
    }
    if (command.notes) {
      container.notes = command.notes;
    }
    if (command.quantity) {
      container.quantity = command.quantity;
    }
    if (command.imageIds) {
      container.imageIds = command.imageIds;
    }
    if (command.properties) {
      container.properties = command.properties.map(property => mapPropertyDtoToProperty(property));
    }
    if (command.elements) {
      container.elements = command.elements.map(element => mapElementDtoToElement(element));
    }

    return container;
  }
}
