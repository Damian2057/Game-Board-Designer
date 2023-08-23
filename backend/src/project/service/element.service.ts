import { Injectable } from '@nestjs/common';
import { UpdateElementCommand } from "../model/command/element/update.element.command";
import { CreateElementCommand } from "../model/command/element/create.element.command";
import { ElementDto } from "../model/dto/element.dto";
import { Element } from "../model/domain/element.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { IllegalArgumentException } from "../../exceptions/type/Illegal.argument.exception";
import { mapElementToElementDto } from "../util/util.functions";
import { Result } from "../../util/pojo/Result";

@Injectable()
export class ElementService {

  constructor(
    @InjectRepository(Element)
    private readonly elementRepository: Repository<Element>,
  ) {
  }

  async updateElement(command: UpdateElementCommand, elementId: number): Promise<ElementDto> {
    let element = await this.getElementById(elementId);
    element = this.updateNotNullFields(command, element);
    const updatedElement: Element = await this.elementRepository.save(element);
    return mapElementToElementDto(updatedElement);
  }


  addContainerElement(command: CreateElementCommand, containerId: number) {
    return undefined;
  }

  addProjectElement(command: CreateElementCommand, projectId: number) {
    return undefined;
  }

  async getElementDtoById(elementId: number): Promise<ElementDto> {
    const element: Element = await this.getElementById(elementId);
    return mapElementToElementDto(element);
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
    return element;
  }
}
