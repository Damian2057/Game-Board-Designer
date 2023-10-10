import { IsString, Length } from "class-validator";

export class CreatePropertyCommand {

  @IsString()
  @Length(3, 50)
  name: string;

  @IsString()
  @Length(3, 50)
  value: string;
}