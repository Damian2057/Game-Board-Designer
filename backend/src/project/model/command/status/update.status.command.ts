import { IsNotEmpty } from "class-validator";

export class UpdateStatusCommand {

  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  status: string;
}