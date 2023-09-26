import { UserUpdateCommand } from "./user.update.command";

export class AdvancedUserUpdateCommand extends UserUpdateCommand {
  isActive: boolean;
  role: string;
}