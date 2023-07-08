import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../../src/users/controller/user.controller';
import { UsersModule } from "../../src/users/users.module";

describe('UserControllerController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UsersModule],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller.getHello()).toBe("Hello");
  });
});
