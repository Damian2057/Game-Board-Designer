import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "../../../src/app.module";
import { Repository } from "typeorm";
import { Game } from "../../../src/game/model/domain/game.entity";
import { getRepositoryToken } from "@nestjs/typeorm";
import { createGame } from "../utils";
import { User } from "../../../src/users/model/domain/user.entity";
import { UserRole } from "../../../src/users/model/domain/user.role.enum";
const bcrypt = require('bcrypt');

describe('GameController (integration)', () => {

  let app: INestApplication;
  let gameRepository: Repository<Game>
  let userRepository: Repository<User>

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    gameRepository = moduleFixture.get<Repository<Game>>(getRepositoryToken(Game));
    userRepository = moduleFixture.get<Repository<User>>(getRepositoryToken(User));

    await gameRepository.delete({});
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
    const game: Game = createGame('title',
      'description',
      '2021-01-01',
      10,
      'EUR',
      [],
      [],
      [1, 2]);
    const game2: Game = createGame('title2',
      'description2',
      '2021-01-01',
      10,
      'EUR',
      [],
      [],
      [3, 4]);
    await gameRepository.save([game, game2]);
  });

  afterEach(async () => {
    await gameRepository.delete({});
  });

  afterAll(async() => {
    await app.close()
  })

  it('/game/all (GET) OK', async () => {
    return request(app.getHttpServer())
      .get('/game/all')
      .expect(200)
      .expect(res => {
        res.body.size = 2;
      });
  });

  it('game/all/paged (GET) OK', () => {
    return request(app.getHttpServer())
      .get('/game/all/paged?page=1&limit=1')
      .expect(200)
      .expect(res => {
        res.body.size = 1;
        res.body.meta.totalItems = 2;
        res.body.meta.totalPages = 2;
        res.body.meta.currentPage = 1;
        res.body.meta.itemsPerPage = 1;
        res.body.meta.itemCount = 1;
      });
  });

  it('game/all/paged (GET) BAD REQUEST missing limit', () => {
    return request(app.getHttpServer())
      .get('/game/all/paged?page=1')
      .expect(400);
  });

  it('game/all/paged (GET) BAD REQUEST missing page', () => {
    return request(app.getHttpServer())
      .get('/game/all/paged?limit=1')
      .expect(400);
  });

  it('game/:id (GET) OK', async () => {
    const game = await gameRepository.findOneBy({ title: 'title' });
    return request(app.getHttpServer()).get(`/game/${game.id}`)
      .expect(200)
      .expect(res => {
        expect(res.body.title).toBe('title');
        expect(res.body.description).toBe('description');
        expect(res.body.publicationDate).toBe('2021-01-01');
        expect(res.body.price).toBe(10);
        expect(res.body.currency).toBe('EUR');
        expect(res.body.imageIds.length).toBe(2);
      })
  });

  it('game/:id (GET) NOT FOUND', () => {
    return request(app.getHttpServer()).get(`/game/-1`)
      .expect(406)
  });

  it('game/find/by (GET) OK', () => {
    return request(app.getHttpServer()).get(`/game/find/by?title=title`)
      .expect(200)
      .expect(res => {
        expect(res.body.length).toBe(1);
        expect(res.body[0].title).toBe('title');
        expect(res.body[0].description).toBe('description');
        expect(res.body[0].publicationDate).toBe('2021-01-01');
        expect(res.body[0].price).toBe(10);
        expect(res.body[0].currency).toBe('EUR');
        expect(res.body[0].imageIds.length).toBe(2);
      })
  });

  it('game/create (POST) UNAUTHORIZED', () => {
    return request(app.getHttpServer()).post(`/game/create`)
      .send({})
      .expect(401)
  });

  it('game/create (POST) UNAUTHORIZED bad token', () => {
    return request(app.getHttpServer()).post(`/game/create`)
      .set('Authorization', 'Bearer ' + 'invalid token')
      .send({})
      .expect(401)
  });

  it('game/create (POST) NOT ACCEPTABLE missing data', async () => {
    const token = await getAuthToken();
    console.log(token);
    return request(app.getHttpServer()).post(`/game/create`)
      .set('Authorization', 'Bearer ' + token)
      .send({})
      .expect(406)
  });
});