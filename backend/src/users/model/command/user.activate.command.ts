import { IsNotEmpty, IsString } from "class-validator";

export class UserActivateCommand {

  @IsNotEmpty()
  @IsString()
  code: string;
}