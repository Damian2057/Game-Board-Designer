import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "../model/domain/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRegisterCommand } from "../model/command/user.register.command";
import { mapUserCommandToUser, mapUserToUserDto } from "../util/util.functions";
import { UserDto } from "../model/dto/user.dto";
import { UserNotFound } from "../../exceptions/type/user.not.found";
import { UserUpdateCommand } from "../model/command/user.update.command";

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: number) {
    return await this.userRepository.findOneBy({id: id});
  }

  async findOneByEmail(email: string) {
    return await this.userRepository.findOneBy({email: email});
  }

  async findOneByUsername(username: string) {
    return await this.userRepository.findOneBy({username: username});
  }

  async create(command: UserRegisterCommand): Promise<boolean> {
    if (await this.findOneByEmail(command.email) == null) {
      await this.userRepository.save(await mapUserCommandToUser(command));
      return true;
    } else {
      return false;
    }
  }

  me(user): Promise<UserDto> {
    if (user != null) {
      return mapUserToUserDto(user);
    }
    throw new UserNotFound();
  }

  async update(user: User, command: UserUpdateCommand): Promise<UserDto> {
    return null;
  }
}
