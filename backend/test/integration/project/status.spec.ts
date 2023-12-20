import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { User } from "../../../src/users/model/domain/user.entity";
import { Repository } from "typeorm";
import { UserRole } from "../../../src/users/model/domain/user.role.enum";
import { getRepositoryToken } from "@nestjs/typeorm";
import { AppModule } from "../../../src/app.module";
import { Test, TestingModule } from "@nestjs/testing";
import { Box } from "../../../src/project/model/domain/box.entity";
const bcrypt = require('bcrypt');

describe('StatusController (integration)', () => {

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

  it('should return 200 OK', async () => {
    const token = await getAuthToken();
    return request(app.getHttpServer())
      .get('/status/available-statuses')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });

  it('should return 401 Unauthorized', async () => {
    return request(app.getHttpServer())
      .get('/status/available-statuses')
      .expect(401);
  });

  it('should update status', async () => {
    const token = await getAuthToken();
    const box = await boxRepository.findOne({ where: { name: "box" } });
    return request(app.getHttpServer())
      .put('/status/update-status/' + box.id)
      .send({
        status: "BLOCKED",
        type: "box",
      })
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect(res => {
        expect(res.body.message).toBe("success");
      });
  });

});