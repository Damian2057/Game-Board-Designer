import { INestApplication } from "@nestjs/common";
import { ImageEntity } from "../../../src/image/model/domain/image.entity";
import { Repository } from "typeorm";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../../../src/app.module";
import { User } from "../../../src/users/model/domain/user.entity";
import { UserRole } from "../../../src/users/model/domain/user.role.enum";
import * as request from "supertest";

const bcrypt = require('bcrypt');

describe('ImageController (integration)', () => {

  let app: INestApplication;
  let userRepository: Repository<User>;
  let imageRepository: Repository<ImageEntity>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    imageRepository = moduleFixture.get<Repository<ImageEntity>>(getRepositoryToken(ImageEntity));
    userRepository = moduleFixture.get<Repository<User>>(getRepositoryToken(User));

    await userRepository.delete({});
    await imageRepository.delete({});

    await userRepository.save({
      username: "username",
      email: "email",
      password: await bcrypt.hash("password", 12),
      isActive: true,
      phoneNumber: "123123123",
      role: UserRole.ADMIN
    });

    await app.init();
  });

  afterEach(async () => {
    await imageRepository.delete({});
  });

  afterAll(async () => {
    await app.close();
  });

  async function getAuthToken(): Promise<string> {
    const res = await request(app.getHttpServer()).post("/auth/login")
      .send({
        email: "email",
        password: "password"
      })
      .expect(201);
    return res.body.token;
  }

  it('get all empty files', async () => {
    const token = await getAuthToken();
    const res = await request(app.getHttpServer()).get("/image/all")
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    expect(res.body.length).toBe(0);
  });

  it('get list of files', async () => {
    const file1 = new ImageEntity('file1', 'image/png');
    const file2 = new ImageEntity('file2', 'image/png');
    await imageRepository.save([file1, file2]);
    const token = await getAuthToken();
    const res = await request(app.getHttpServer()).get("/image/all")
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    expect(res.body.length).toBe(2);
  });
});