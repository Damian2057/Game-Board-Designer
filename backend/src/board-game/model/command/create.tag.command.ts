import { IsNotEmpty, IsString, Length } from "class-validator";

export class CreateTagCommand {

  @IsString()
  @Length(2, 20)
  name: string;
}