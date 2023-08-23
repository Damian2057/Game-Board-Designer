import { Injectable } from '@nestjs/common';
import { UpdatePriorityCommand } from "../model/command/priority/update.priority.command";
import { Priority } from "../model/domain/priority.enum";
import { InjectRepository } from "@nestjs/typeorm";
import { Element } from "../model/domain/element.entity";
import { Repository, UpdateResult } from "typeorm";
import { Container } from "../model/domain/container.entity";
import { Box } from "../model/domain/box.entity";
import { Result } from "../../util/pojo/Result";
import { IllegalArgumentException } from "../../exceptions/type/Illegal.argument.exception";

@Injectable()
export class PriorityService {

  constructor(
    @InjectRepository(Element)
    private readonly elementRepository: Repository<Element>,
    @InjectRepository(Container)
    private readonly containerRepository: Repository<Container>,
    @InjectRepository(Box)
    private readonly boxRepository: Repository<Box>
  ) {}

  async updatePriority(command: UpdatePriorityCommand, projectId: number): Promise<any> {
    let result = new UpdateResult();
    switch (command.type) {
      case 'box':
        result = await this.boxRepository.update(projectId, { priority: command.priority });
        break;
      case 'container':
        result = await this.containerRepository.update(projectId, { priority: command.priority });
        break;
      case 'element':
        result = await this.elementRepository.update(projectId, { priority: command.priority });
        break;
      default:
        throw new IllegalArgumentException(`Type ${command.type} is not supported.`);
    }
    return new Result(result);
  }

  getAvailablePriorities(): Priority[] {
    return Object.values(Priority);
  }
}
