import { Injectable } from '@nestjs/common';
import { UpdatePriorityCommand } from "../model/command/priority/update.priority.command";
import { Priority } from "../model/domain/priority.enum";

@Injectable()
export class PriorityService {

  updatePriority(command: UpdatePriorityCommand, projectId: number) {
    return undefined;
  }

  getAvailablePriorities(): Priority[] {
    return Object.values(Priority);
  }
}
