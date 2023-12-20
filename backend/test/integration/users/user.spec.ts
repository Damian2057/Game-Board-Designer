import { INestApplication } from "@nestjs/common";
import { Not, Repository } from "typeorm";
import { User } from "../../../src/users/model/domain/user.entity";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../../../src/app.module";
import { getRepositoryToken } from "@nestjs/typeorm";
import { UserRole } from "../../../src/users/model/domain/user.role.enum";
import * as request from "supertest";
import { CodeEntity } from "../../../src/users/model/domain/code.entity";
const bcrypt = require('bcrypt');

describe('UserController (integration)', () => {

  let app: INestApplication;
  let userRepository: Repository<User>;
  let codeRepository: Repository<CodeEntity>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    userRepository = moduleFixture.get<Repository<User>>(getRepositoryToken(User));
    codeRepository = moduleFixture.get<Repository<CodeEntity>>(getRepositoryToken(CodeEntity));

    await userRepository.delete({});
    await codeRepository.delete({});

    await userRepository.save({
      username: "username",
      email: "email",
      password: await bcrypt.hash("password", 12),
      isActive: true,
      phoneNumber: "123123123",
      role: UserRole.ADMIN
    });

    await codeRepository.save({
      code: "code",
      email: "email2",
      createdAt: '2025-01-01'
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

  it('register', async () => {
    const res = await request(app.getHttpServer()).post("/user/register")
      .send({
        username: "username3",
        email: "email3",
        password: "password",
        phoneNumber: "123123123"
      })
      .expect(201);
    expect(res.body).toBeDefined();
  });

  it('create account', async () => {
    const token = await getAuthToken();
    const res = await request(app.getHttpServer()).post("/user/create")
      .set('Authorization', `Bearer ${token}`)
      .send({
        username: "username3",
        email: "email3",
        password: "password",
        phoneNumber: "123123123",
        role: UserRole.EMPLOYEE
      })
      .expect(201);
    expect(res.body).toBeDefined();
  });

  it('get users', async () => {
    const token = await getAuthToken();
    const res = await request(app.getHttpServer()).get("/user/all")
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    expect(res.body.length).toEqual(2);
  });

  it('get roles', async () => {
    const token = await getAuthToken();
    const res = await request(app.getHttpServer()).get("/user/roles")
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    expect(res.body.length).toEqual(3);
  });

  it('self update', async () => {
    const token = await getAuthToken();
    const res = await request(app.getHttpServer()).put("/user/self_update")
      .set('Authorization', `Bearer ${token}`)
      .send({
        phoneNumber: "123123123"
      })
      .expect(200);
    expect(res.body).toBeDefined();
  });

  it('update user by id', async () => {
    const token = await getAuthToken();
    const user = await userRepository.findOneBy({username: 'username2'});
    const res = await request(app.getHttpServer()).put(`/user/update/${user.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        phoneNumber: "123123123"
      })
      .expect(200);
    expect(res.body).toBeDefined();
  });

  it('get current user', async () => {
    const token = await getAuthToken();
    const res = await request(app.getHttpServer()).get("/user/self")
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    expect(res.body).toBeDefined();
  });

  it('get users by filter', async () => {
    const token = await getAuthToken();
    const res = await request(app.getHttpServer()).get("/user/find?username=username")
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    expect(res.body.length).toEqual(1);
  });

  it('get users by filter paged', async () => {
    const token = await getAuthToken();
    return request(app.getHttpServer()).get("/user/find/paged?page=1&limit=1&username=username")
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.items.length).toEqual(1);
        expect(res.body.meta.totalItems).toEqual(2);
      });
  });

  it('activate', async () => {
    const user = await userRepository.findOneBy({username: 'username2'});
    await userRepository.update(user.id, {isActive: false});
    await request(app.getHttpServer()).put("/user/activate")
      .send({
        code: "code",
      })
      .expect(200)
    const updatedUser = await userRepository.findOneBy({username: 'username2'});
    expect(updatedUser.isActive).toBeTruthy();
  });
});