import { UserRegisterCommand } from "./user.register.command";
import { IsNotEmpty } from "class-validator";

export class AdvancedUserCreateCommand extends UserRegisterCommand {

  isActive: boolean;

  @IsNotEmpty()
  role: string;

}