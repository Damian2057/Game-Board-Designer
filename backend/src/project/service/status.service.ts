import { Injectable } from '@nestjs/common';
import { Project } from "../model/domain/project.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UpdateStatusCommand } from "../model/command/status/update.status.command";
import { Status } from "../model/domain/status.enum";

@Injectable()
export class StatusService {

  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {
  }

  updateStatus(command: UpdateStatusCommand, projectId: number) {
    return undefined;
  }

  getAvailableStatuses() {
    return Object.values(Status);
  }
}
