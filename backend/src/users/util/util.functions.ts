import { UserRegisterCommand } from "../model/command/user.register.command";
import { User } from "../model/domain/user.entity";
import { UserDto } from "../model/dto/user.dto";
const bcrypt = require('bcrypt');

export async function mapUserCommandToUser(command: UserRegisterCommand): Promise<User> {
  const user = new User();
  user.email = command.email;
  user.password = await hashPassword(command.password);
  user.phoneNumber = command.phoneNumber;
  user.username = command.username;
  return user;
}

export async function mapUserToUserDto(user: User): Promise<UserDto> {
  const userDto = new UserDto();
  userDto.id = user.id;
  userDto.email = user.email;
  userDto.phoneNumber = user.phoneNumber;
  userDto.username = user.username;
  return userDto;
}

export function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}