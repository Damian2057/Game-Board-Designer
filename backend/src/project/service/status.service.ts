import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, UpdateResult } from "typeorm";
import { UpdateStatusCommand } from "../model/command/status/update.status.command";
import { Status } from "../model/domain/status.enum";
import { Element } from "../model/domain/element.entity";
import { Container } from "../model/domain/container.entity";
import { Box } from "../model/domain/box.entity";
import { IllegalArgumentException } from "../../exceptions/type/Illegal.argument.exception";
import { Result } from "../../util/pojo/Result";

@Injectable()
export class StatusService {

  constructor(
    @InjectRepository(Element)
    private readonly elementRepository: Repository<Element>,
    @InjectRepository(Container)
    private readonly containerRepository: Repository<Container>,
    @InjectRepository(Box)
    private readonly boxRepository: Repository<Box>,
  ) {
  }

  async updateStatus(command: UpdateStatusCommand, id: number): Promise<Result> {
    let result = new UpdateResult();
    switch (command.type) {
      case 'box':
        result = await this.boxRepository.update(id, { status: command.status });
        break;
      case 'container':
        result = await this.containerRepository.update(id, { status: command.status });
        break;
      case 'element':
        result = await this.elementRepository.update(id, { status: command.status });
        break;
      default:
        throw new IllegalArgumentException(`Type ${command.type} is not supported.`);
    }
    return new Result(result);
  }

  getAvailableStatuses(): Status[] {
    return Object.values(Status);
  }
}
