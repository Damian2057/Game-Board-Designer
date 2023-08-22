import { Injectable } from '@nestjs/common';
import { UpdateContainerCommand } from "../model/command/container/update.container.command";
import { Repository } from "typeorm";
import { Container } from "../model/domain/container.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateContainerCommand } from "../model/command/container/create.container.command";

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

  getContainerById(containerId: number) {
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
}
