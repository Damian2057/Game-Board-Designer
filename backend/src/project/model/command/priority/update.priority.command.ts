import { IsEnum, IsIn } from "class-validator";
import { Priority } from "../../domain/priority.enum";

export class UpdatePriorityCommand {

  @IsEnum(Priority)
  priority: Priority;

  @IsIn(['box', 'container', 'element'])
  type: string;
}