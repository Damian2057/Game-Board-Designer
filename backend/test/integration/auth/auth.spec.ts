import { INestApplication } from "@nestjs/common";
import { User } from "../../../src/users/model/domain/user.entity";
import { Not, Repository } from "typeorm";
import { UserRole } from "../../../src/users/model/domain/user.role.enum";
import { getRepositoryToken } from "@nestjs/typeorm";
import { AppModule } from "../../../src/app.module";
import { Test, TestingModule } from "@nestjs/testing";
import * as request from "supertest";
const bcrypt = require('bcrypt');

describe('AuthController (integration)', () => {

  let app: INestApplication;
  let userRepository: Repository<User>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    userRepository = moduleFixture.get<Repository<User>>(getRepositoryToken(User));

    await userRepository.delete({});

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

  beforeEach(async () => {
    await userRepository.save({
      username: "username2",
      email: "email2",
      password: await bcrypt.hash("password", 12),
      isActive: true,
      phoneNumber: "123123123",
      role: UserRole.EMPLOYEE
    });
  });

  async function getRefreshAuthToken(): Promise<string> {
    const res = await request(app.getHttpServer()).post("/auth/login")
      .send({
        email: "email",
        password: "password"
      })
      .expect(201);
    return res.body.refreshToken;
  }

  afterEach(async () => {
    // Replace 'username' with the username you want to keep
    const usersToDelete = await userRepository.find({ where: { username: Not('username') } });

    // Delete all users except the one with username "username"
    await Promise.all(usersToDelete.map(async (user) => {
      await userRepository.delete(user.id);
    }));
  });

  afterAll(async () => {
    await app.close();
  });

  it('should return 201 and a token when logging in', async () => {
    const res = await request(app.getHttpServer()).post("/auth/login")
      .send({
        email: "email",
        password: "password"
      })
      .expect(201);
    expect(res.body.token).toBeDefined();
  });

  it('should return 401 when logging in with wrong password', async () => {
    await request(app.getHttpServer()).post("/auth/login")
      .send({
        email: "email",
        password: "wrongpassword"
      })
      .expect(404);
  });

  it('should return 401 when logging in with wrong email', async () => {
    await request(app.getHttpServer()).post("/auth/login")
      .send({
        email: "wrongemail",
        password: "password"
      })
      .expect(404);
  });

  it('should return 401 when logging in with wrong email and password', async () => {
    await request(app.getHttpServer()).post("/auth/login")
      .send({
        email: "wrongemail",
        password: "wrongpassword"
      })
      .expect(404);
  });

  it('should return 401 when logging in with empty email', async () => {
    await request(app.getHttpServer()).post("/auth/login")
      .send({
        email: "",
        password: "password"
      })
      .expect(404);
  });

  it('should return 401 when logging in with empty password', async () => {
    await request(app.getHttpServer()).post("/auth/login")
      .send({
        email: "email",
        password: ""
      })
      .expect(404);
  });

  it('should return 401 when logging in with empty email and password', async () => {
    await request(app.getHttpServer()).post("/auth/login")
      .send({
        email: "",
        password: ""
      })
      .expect(404);
  });

  it('should return 401 when logging in with empty email and wrong password', async () => {
    await request(app.getHttpServer()).post("/auth/login")
      .send({
        email: "",
        password: "wrongpassword"
      })
      .expect(404);
  });

  it('should return 401 when logging in with wrong email and empty password', async () => {
    await request(app.getHttpServer()).post("/auth/login")
      .send({
        email: "wrongemail",
        password: ""
      })
      .expect(404);
  });
});