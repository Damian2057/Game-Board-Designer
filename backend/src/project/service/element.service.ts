import { Injectable } from "@nestjs/common";
import { UpdateElementCommand } from "../model/command/element/update.element.command";
import { CreateElementCommand } from "../model/command/element/create.element.command";
import { ElementDto } from "../model/dto/element.dto";
import { Element } from "../model/domain/element.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { IllegalArgumentException } from "../../exceptions/type/Illegal.argument.exception";
import {
  mapElementCommandToElement,
  mapElementToElementDto,
  mapPropertyDtoToProperty
} from "../util/util.functions";
import { Result } from "../../util/pojo/Result";
import { Project } from "../model/domain/project.entity";
import { Container } from "../model/domain/container.entity";
import { ImageService } from "../../image/service/image.service";
import { Property } from "../model/domain/property.entity";
import { CreatePropertyCommand } from "../model/command/property/create.property.command";

@Injectable()
export class ElementService {

  constructor(
    @InjectRepository(Element)
    private readonly elementRepository: Repository<Element>,
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(Container)
    private readonly containerRepository: Repository<Container>,
    private readonly imageService: ImageService,
    @InjectRepository(Property)
    private readonly propertyRepository: Repository<Property>,
  ) {
  }

  async updateElement(command: UpdateElementCommand, elementId: number): Promise<ElementDto> {
    await this.imageService.checkImageExists(command.imageIds);
    let element = await this.getElementById(elementId);
    element = this.updateNotNullFields(command, element);
    return mapElementToElementDto(await this.updateAndFlush(element));
  }

  async addContainerElement(command: CreateElementCommand, containerId: number): Promise<ElementDto[]> {
    await this.imageService.checkImageExists(command.imageIds);
    const container: Container = await this.containerRepository.findOne({
      relations: {
        elements: {
          properties: true,
        },
        properties: true,
      },
      where: {
        id: containerId,
      }
    });
    if (!container) {
      throw new IllegalArgumentException(`Container with id: ${containerId} does not exist!`);
    }
    const element: Element = mapElementCommandToElement(command);
    await this.updateAndFlush(element);
    if (!container.elements) {
      container.elements = [];
    }
    container.elements.push(element);
    await this.containerRepository.save(container);

    return container.elements.map(element => mapElementToElementDto(element));
  }

  async addProjectElement(command: CreateElementCommand, projectId: number): Promise<ElementDto[]> {
    await this.imageService.checkImageExists(command.imageIds);
    const project: Project = await this.projectRepository.findOne({
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
    if (!project) {
      throw new IllegalArgumentException(`Project with id: ${projectId} does not exist!`);
    }
    const element: Element = mapElementCommandToElement(command);
    await this.updateAndFlush(element)
    if (!project.elements) {
      project.elements = [];
    }
    project.elements.push(element);
    const result = await this.projectRepository.save(project);

    return result.elements.map(element => mapElementToElementDto(element));
  }

  async getElementDtoById(elementId: number): Promise<ElementDto> {
    const element: Element = await this.getElementById(elementId);
    return mapElementToElementDto(element);
  }

  async updateAndFlush(element: Element): Promise<Element> {
    await this.propertyRepository.save(element.properties);
    return await this.elementRepository.save(element);
  }

  async updatesAndFlush(elements: Element[]): Promise<Element[]> {
    let elementsToSave: Element[] = [];
    for (const element of elements) {
      elementsToSave.push(await this.updateAndFlush(element));
    }
    return elementsToSave;
  }

  async deleteElementById(elementId: number): Promise<Result> {
    const result = await this.elementRepository.delete(elementId)
    if (result.affected > 0) {
      return new Result(result);
    }
    throw new IllegalArgumentException(`Element with id: ${elementId} does not exist!`)
  }

  private async getElementById(elementId: number): Promise<Element> {
    const element = await this.elementRepository.findOne({
      relations: {
        container: true,
        project: true,
        properties: true,
      },
      where: {
        id: elementId,
      }
    });
    if (!element) {
      throw new IllegalArgumentException(`Element with id ${elementId} not found`);
    }
    return element;
  }

  private updateNotNullFields(command: UpdateElementCommand, element: Element): Element {
    if (command.name) {
      element.name = command.name;
    }
    if (command.description) {
      element.description = command.description;
    }
    if (command.notes) {
      element.notes = command.notes;
    }
    if (command.quantity) {
      element.quantity = command.quantity;
    }
    if (command.imageIds) {
      element.imageIds = command.imageIds;
    }
    if (command.properties) {
      element.properties = command.properties.map(property => mapPropertyDtoToProperty(property));
    }
    return element;
  }

  async addPropertyToElement(command: CreatePropertyCommand, elementId: number) {
    let element: Element = await this.getElementById(elementId);
    element.properties.push(new Property(command.name, command.value));
    const updated = await this.updateAndFlush(element);
    return mapElementToElementDto(updated);
  }
}
