import { IsEnum, IsIn, IsNotEmpty } from "class-validator";
import { Priority } from "../../domain/priority.enum";

export class UpdatePriorityCommand {

  @IsNotEmpty()
  id: number;

  @IsEnum(Priority)
  priority: Priority;

  @IsIn(['box', 'container', 'element'])
  type: string;
}