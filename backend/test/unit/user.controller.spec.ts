import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../../src/users/controller/user.controller';
import { UserModule } from "../../src/users/user.module";

describe('UserControllerController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UserModule],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller.getHello()).toBe("Hello");
  });
});
