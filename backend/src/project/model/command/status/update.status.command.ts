import { IsEnum, IsIn } from "class-validator";
import { Status } from "../../domain/status.enum";

export class UpdateStatusCommand {

  @IsEnum(Status)
  status: Status;

  @IsIn(['box', 'container', 'element'])
  type: string;
}