import { IsNotEmpty } from "class-validator";

export class UpdatePriorityCommand {

  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  priority: string;
}