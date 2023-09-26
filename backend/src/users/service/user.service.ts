import { Injectable, Logger } from "@nestjs/common";
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
import { UserRole } from "../model/domain/user.role.enum";
import { UserAlreadyExistsException } from "../../exceptions/type/user.already.exists.exception";
import { SetFilter } from "../../util/SetFilter";
import { Result } from "../../util/pojo/Result";
import { Queue } from "bull";
import { InjectQueue } from "@nestjs/bull";
import { CODE_SEND_EMAIL } from "../../util/bullMQ/queue";
import { UserActivateCommand } from "../model/command/user.activate.command";
import { CodeEntity } from "../model/domain/code.entity";
import { IllegalArgumentException } from "../../exceptions/type/Illegal.argument.exception";

@Injectable()
export class UserService {

  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(CodeEntity)
    private readonly codeRepository: Repository<CodeEntity>,
    @InjectQueue(CODE_SEND_EMAIL) private readonly sendEmailQueue: Queue
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

  async findOneByEmail(email: string): Promise<User> {
    const user: User = await this.userRepository.findOneBy({email: email});
    if (user != null) {
      return user;
    }
    return null;
  }

  async register(command: UserRegisterCommand): Promise<Result> {
    if (await this.findOneByEmail(command.email) == null) {
      await this.userRepository.save(await mapUserCommandToUser(command));
      this.sendEmailQueue.add({
        email: command.email
      });
      return new Result({affected: 1})
    }
    throw new UserAlreadyExistsException('User with email: ' + command.email + ' already exists!');
  }

  async me(user: User): Promise<UserDto> {
    const currentUser: User = await this.findOneByEmail(user.email)
    if (currentUser != null) {
      return mapUserToUserDto(currentUser);
    }
    throw new UserNotFound();
  }

  async selfUpdate(user: User, command: UserUpdateCommand): Promise<UserDto> {
    user = await this.updateNotNullFields(user, command);
    const updated: User = await this.userRepository.save(user);
    return mapUserToUserDto(updated);
  }

  async updateById(id: number, command: UserUpdateCommand): Promise<UserDto> {
      let user: User = await this.findOne(id);
      if (user == null) {
        throw new UserNotFound();
      }
      user = await this.updateNotNullFields(user, command);
      const updated: User = await this.userRepository.save(user);
      return mapUserToUserDto(updated);
  }

  async find(roles: string, email: string, username: string, phoneNumber: string, id: number): Promise<UserDto[]> {
    const users = new SetFilter();
    if (roles != null) {
      const split = roles.split(',');
      for (const role of split) {
        const result = await this.userRepository.createQueryBuilder("user")
          .where("user.role = :role",
            {role: getEnumValueByName(UserRole, role)})
          .getMany();
        result.forEach(user => users.add(user));
      }
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

  getRoles(): UserRole[] {
    return Object.values(UserRole)
  }

  private async updateNotNullFields(user: User, command: UserUpdateCommand): Promise<User> {
    if (command.username != null) {
      user.username = command.username;
    }
    if (command.phoneNumber != null) {
      user.phoneNumber = command.phoneNumber;
    }
    if (command.password != null) {
      user.password = command.password;
    }
    if (command.email != null) {
      if (await this.findOneByEmail(command.email) == null) {
        user.email = command.email;
      } else {
        throw new UserAlreadyExistsException('User with email: ' + command.email + ' already exists!');
      }
    }
    if (command.role != null) {
      user.role = getEnumValueByName(UserRole, command.role);
    }
    return user;
  }

  async activate(command: UserActivateCommand) {
    const code = await this.codeRepository.findOneBy({ code: command.code });
    if (code == null) {
      throw new IllegalArgumentException('Code is incorrect!');
    }
    if (this.isValid(code)) {
      await this.codeRepository.delete(code);
      throw new IllegalArgumentException('Code is expired!');
    }
    const user = await this.userRepository.findOneBy({ email: code.email });
    user.isActive = true;
    await this.userRepository.save(user);
    await this.codeRepository.delete(code);
    this.logger.log(`User ${user.username} activated!`);
  }

  private isValid(code: CodeEntity): boolean {
    const currentTime = new Date();
    const codeDate = new Date(code.createdAt);
    const timeDifference = currentTime.getTime() - codeDate.getTime();
    const hoursDifference = timeDifference / (1000 * 60 * 60);
    return hoursDifference > 2;
  }
}
