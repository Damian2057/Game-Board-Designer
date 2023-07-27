import { IsNotEmpty, IsString } from "class-validator";

export class AuthLoginCommand {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}