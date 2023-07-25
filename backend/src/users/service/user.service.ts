import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "../model/domain/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthService } from "../../auth/service/auth.service";

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly authService: AuthService
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
}
