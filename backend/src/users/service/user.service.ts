import { Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "../model/user.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async findAll(): Promise<User[]> {
    const user = new User({
      name: "John Doe"
    });
    await this.userRepository.save(user)
    return await this.userRepository.find()
  }
}
