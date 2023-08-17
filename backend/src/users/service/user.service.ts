import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "../model/domain/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRegisterCommand } from "../model/command/user.register.command";
import {
  getEnumValueByName,
  mapUserCommandToUser,
  mapUserToUserDto
} from "../util/util.functions";
import { UserDto } from "../model/dto/user.dto";
import { UserNotFound } from "../../exceptions/type/user.not.found";
import { UserUpdateCommand } from "../model/command/user.update.command";
import { UserRoleEntity } from "../model/domain/user.role.entity";
import { UserAlreadyExistsException } from "../../exceptions/type/user.already.exists.exception";
import { SetFilter } from "../../util/SetFilter";

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async findAll(): Promise<UserDto[]> {
    const users: User[] = await this.userRepository.find();
    return users.map(user => mapUserToUserDto(user));
  }

  async findOne(id: number): Promise<User> {
    const user: User = await this.userRepository.findOneBy({id: id});
    if (user != null) {
      return user;
    }
    throw new UserNotFound();
  }

  async findOneByEmail(email: string) {
    const user: User = await this.userRepository.findOneBy({email: email});
    if (user != null) {
      return mapUserToUserDto(user);
    }
    return null;
  }

  async findOneByUsername(username: string): Promise<User> {
    const user: User = await this.userRepository.findOneBy({username: username});
    if (user != null) {
      return user;
    }
    throw new UserNotFound();
  }

  async create(command: UserRegisterCommand): Promise<boolean> {
    if (await this.findOneByEmail(command.email) == null) {
      await this.userRepository.save(await mapUserCommandToUser(command));
      return true;
    }
    throw new UserAlreadyExistsException('User with email: ' + command.email + ' already exists!');
  }

  me(user): UserDto {
    if (user != null) {
      return mapUserToUserDto(user);
    }
    throw new UserNotFound();
  }

  async selfUpdate(user: User, command: UserUpdateCommand): Promise<UserDto> {
    user = this.updateNotNullFields(user, command);
    const updated: User = await this.userRepository.save(user);
    return mapUserToUserDto(updated);
  }

  async updateById(id: number, command: UserUpdateCommand): Promise<UserDto> {
      let user: User = await this.findOne(id);
      user = this.updateNotNullFields(user, command);
      const updated: User = await this.userRepository.save(user);
      return mapUserToUserDto(updated);
  }

  async find(role: string, email: string, username: string, phoneNumber: string, id: number): Promise<UserDto[]> {
    const users = new SetFilter();
    if (role != null) {
      const result = await this.userRepository.createQueryBuilder("user")
        .where("user.role = :role",
          {role: getEnumValueByName(UserRoleEntity, role)})
        .getMany();
      result.forEach(user => users.add(user));
    }
    if (email != null) {
      const result = await this.userRepository.findOneBy({email: email});
      if (result != null) {
        users.add(result);
      }
    }
    if (username != null) {
      const result = await this.userRepository.findOneBy({username: username});
      if (result != null) {
        users.add(result);
      }
    }
    if (phoneNumber != null) {
      const result = await this.userRepository.findOneBy({phoneNumber: phoneNumber});
      if (result != null) {
        users.add(result);
      }
    }
    if (id != null) {
      const result = await this.userRepository.findOneBy({id: id});
      if (result != null) {
        users.add(result);
      }
    }
    return Array.from(users.get()).map(user => mapUserToUserDto(user));
  }

  private updateNotNullFields(user: User, command: UserUpdateCommand): User {
    if (command.username != null) {
      user.username = command.username;
    }
    if (command.phoneNumber != null) {
      user.phoneNumber = command.phoneNumber;
    }
    if (command.password != null) {
      user.password = command.password;
    }
    if (command.role != null) {
      user.role = getEnumValueByName(UserRoleEntity, command.role);
    }
    return user;
  }
}
