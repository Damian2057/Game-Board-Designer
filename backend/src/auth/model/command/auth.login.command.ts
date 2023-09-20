import { IsNotEmpty, IsString } from "class-validator";

export class AuthLoginCommand {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}