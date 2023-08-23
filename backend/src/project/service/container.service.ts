import { Injectable } from '@nestjs/common';
import { UpdateContainerCommand } from "../model/command/container/update.container.command";
import { Repository } from "typeorm";
import { Container } from "../model/domain/container.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateContainerCommand } from "../model/command/container/create.container.command";
import { IllegalArgumentException } from "../../exceptions/type/Illegal.argument.exception";
import { mapElementToElementDto } from "../util/util.functions";
import { ElementDto } from "../model/dto/element.dto";

@Injectable()
export class ContainerService {

  constructor(
    @InjectRepository(Container)
    private readonly containerRepository: Repository<Container>,
  ) {
  }

  updateContainer(command: UpdateContainerCommand, containerId: number) {
    return undefined;
  }

  getContainerDtoById(containerId: number) {
    return undefined;
  }

  getAllContainersByProjectId(projectId: number) {
    return [];
  }

  deleteContainerById(containerId: number) {

  }

  deleteAllContainersByProjectId(projectId: number) {

  }

  addContainer(command: CreateContainerCommand, projectId: number) {
    return undefined;
  }

  async getAllContainerElementsByContainerId(containerId: number): Promise<ElementDto[]> {
    const container: Container = await this.getContainerById(containerId);
    return container.elements.map(element => mapElementToElementDto(element));
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
}
