import { UserRegisterCommand } from "../model/command/user.register.command";
import { User } from "../model/domain/user.entity";
import { UserDto } from "../model/dto/user.dto";
import { IllegalArgumentException } from "../../exceptions/type/Illegal.argument.exception";
const bcrypt = require('bcrypt');

export async function mapUserCommandToUser(command: UserRegisterCommand): Promise<User> {
  const user = new User();
  user.email = command.email;
  user.password = await hashPassword(command.password);
  user.phoneNumber = command.phoneNumber;
  user.username = command.username;
  return user;
}

export function mapUserToUserDto(user: User): UserDto {
  const userDto = new UserDto();
  userDto.id = user.id;
  userDto.email = user.email;
  userDto.phoneNumber = user.phoneNumber;
  userDto.username = user.username;
  userDto.role = user.role;
  return userDto;
}

export function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export function getEnumValueByName<T>(enumObj: T, enumName: string): T[keyof T] | undefined {
  const enumKeys = Object.keys(enumObj) as Array<keyof T>;
  const enumValues = Object.values(enumObj);

  for (let i = 0; i < enumKeys.length; i++) {
    if (enumValues[i] === enumName) {
      return enumObj[enumKeys[i]];
    }
  }

  throw new IllegalArgumentException(`Enum value with name ${enumName} not found!`)
}