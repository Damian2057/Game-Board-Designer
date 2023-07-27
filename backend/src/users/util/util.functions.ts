import { UserRegisterCommand } from "../model/command/user.register.command";
import { User } from "../model/domain/user.entity";
const bcrypt = require('bcrypt');

export async function mapUserCommandToUser(command: UserRegisterCommand): Promise<User> {
  const user = new User();
  user.email = command.email;
  user.password = await hashPassword(command.password);
  user.phoneNumber = command.phoneNumber;
  user.username = command.username;
  return user;
}

export function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export function comparePasswords(newPassword: string, passwordHash: string): Promise<any>{
  return bcrypt.compare(newPassword, passwordHash);
}