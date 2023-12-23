import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { User } from "../../../src/users/model/domain/user.entity";
import { Repository } from "typeorm";
import { Box } from "../../../src/project/model/domain/box.entity";
import { UserRole } from "../../../src/users/model/domain/user.role.enum";
import { getRepositoryToken } from "@nestjs/typeorm";
import { AppModule } from "../../../src/app.module";
import { Test, TestingModule } from "@nestjs/testing";
const bcrypt = require('bcrypt');
describe('PriorityController (integration)', () => {

  let app: INestApplication;
  let userRepository: Repository<User>;
  let boxRepository: Repository<Box>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    userRepository = moduleFixture.get<Repository<User>>(getRepositoryToken(User));
    boxRepository = moduleFixture.get<Repository<Box>>(getRepositoryToken(Box));

    await userRepository.delete({});
    await boxRepository.delete({});

    await userRepository.save({
      username: "username",
      email: "email",
      password: await bcrypt.hash("password", 12),
      isActive: true,
      phoneNumber: "123123123",
      role: UserRole.ADMIN
    });

    await boxRepository.save({
      name: "box",
      description: "description",
      notes: ["note1", "note2"],
      imageIds: [1, 2],
    });

    await app.init();
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

  afterAll(async () => {
    await app.close();
  });

  it('should return 200 when updating priority', async () => {
    const token = await getAuthToken();
    const res = await request(app.getHttpServer())
      .put("/priority/update-priority/1")
      .set('Authorization', `Bearer ${token}`)
      .send({
        priority: 'A',
        type: 'box'
      })
      .expect(200);
  });

  it('should return 401 Unauthorized', async () => {
    return request(app.getHttpServer())
      .put("/priority/update-priority/1")
      .send({
        priority: 'A',
        type: 'box'
      })
      .expect(401);
  });

  it('should return 200 when getting available priorities', async () => {
    const token = await getAuthToken();
    const res = await request(app.getHttpServer())
      .get("/priority/available-priorities")
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    expect(res.body).toEqual(["A", "B", "C"]);
  });

  it('should return 401 Unauthorized', async () => {
    return request(app.getHttpServer())
      .get("/priority/available-priorities")
      .expect(401);
  });
});