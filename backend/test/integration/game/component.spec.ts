import { INestApplication } from "@nestjs/common";
import { User } from "../../../src/users/model/domain/user.entity";
import { Repository } from "typeorm";
import { Component } from "../../../src/game/model/domain/component";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../../../src/app.module";
import { getRepositoryToken } from "@nestjs/typeorm";
import { UserRole } from "../../../src/users/model/domain/user.role.enum";
import * as request from "supertest";
import { Game } from "../../../src/game/model/domain/game.entity";
import { createGame } from "../utils";
const bcrypt = require('bcrypt');

describe('ComponentController (integration)', () => {

  let app: INestApplication;
  let componentRepository: Repository<Component>
  let userRepository: Repository<User>
  let gameRepository: Repository<Game>

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    componentRepository = moduleFixture.get<Repository<Component>>(getRepositoryToken(Component));
    userRepository = moduleFixture.get<Repository<User>>(getRepositoryToken(User));
    gameRepository = moduleFixture.get<Repository<Game>>(getRepositoryToken(Game));

    await componentRepository.delete({});
    await userRepository.delete({});
    await gameRepository.delete({});

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

  async function getAuthToken(): Promise<string> {
    const res = await request(app.getHttpServer()).post("/auth/login")
      .send({
        email: "email",
        password: "password"
      })
      .expect(201);
    return res.body.token;
  }

  function createComponent(name: string, quantity: number) {
    const component: Component = new Component();
    component.name = name;
    component.quantity = quantity;
    return component;
  }

  beforeEach(async () => {
    const component: Component = createComponent('component', 1);
    const component2: Component = createComponent('component2', 2);
    await componentRepository.save([component, component2]);

    const game: Game = createGame('title',
      'description',
      '2021-01-01',
      10,
      'EUR',
      [],
      [],
      [1, 2]);
    await gameRepository.save(game);
  });

  afterEach(async () => {
    await componentRepository.delete({});
  });

  afterAll(async () => {
    await app.close();
  });

  it('should return all components', async () => {
    return request(app.getHttpServer())
      .get('/component/all')
      .expect(200)
      .then(response => {
        expect(response.body.length).toBe(2);
      });
  });

  it('should return component by id', async () => {
    const token = await getAuthToken();
    const component: Component = await componentRepository.findOneBy({name: 'component'});
    return request(app.getHttpServer())
      .get('/component/find?id=' + component.id)
      .set('Authorization', 'Bearer ' + token)
      .expect(200)
      .then(response => {
        expect(response.body.length).toBe(1);
      });
  });

  it('should return component by name', async () => {
    const token = await getAuthToken();
    return request(app.getHttpServer())
      .get('/component/find?name=component')
      .set('Authorization', 'Bearer ' + token)
      .expect(200)
      .then(response => {
        expect(response.body.length).toBe(1);
      });
  });

  it('should delete component by id', async () => {
    const token = await getAuthToken();
    const component: Component = await componentRepository.findOneBy({name: 'component'});
    return request(app.getHttpServer())
      .delete('/component/delete/' + component.id)
      .set('Authorization', 'Bearer ' + token)
      .expect(200)
      .expect((res) => {
        expect(res.body.message).toEqual('success');
      });
  });

  it('should create component', async () => {
    const token = await getAuthToken();
    const game: Game = await gameRepository.findOneBy({title: 'title'});
    return request(app.getHttpServer())
      .post('/component/create/' + game.id)
      .set('Authorization', 'Bearer ' + token)
      .send({
        name: 'component3',
        quantity: 3
      })
      .expect(201)
      .expect((res) => {
        expect(res.body.components.length).toEqual(1);
        expect(res.body.components[0].name).toEqual('component3');
      });
  });
});