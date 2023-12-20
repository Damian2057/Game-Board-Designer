import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { User } from "../../../src/users/model/domain/user.entity";
import { Repository } from "typeorm";
import { Order } from "../../../src/order/model/domain/order.entity";
import { UserRole } from "../../../src/users/model/domain/user.role.enum";
import { getRepositoryToken } from "@nestjs/typeorm";
import { AppModule } from "../../../src/app.module";
import { Test, TestingModule } from "@nestjs/testing";
import { Game } from "../../../src/game/model/domain/game.entity";
import { createGame } from "../utils";
const bcrypt = require('bcrypt');

describe('OrderController (integration)', () => {

  let app: INestApplication;
  let userRepository: Repository<User>;
  let orderRepository: Repository<Order>;
  let gameRepository: Repository<Game>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    userRepository = moduleFixture.get<Repository<User>>(getRepositoryToken(User));
    orderRepository = moduleFixture.get<Repository<Order>>(getRepositoryToken(Order));
    gameRepository = moduleFixture.get<Repository<Game>>(getRepositoryToken(Game));

    await userRepository.delete({});
    await orderRepository.delete({});
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

  beforeEach(async () => {
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

  async function getAuthToken(): Promise<string> {
    const res = await request(app.getHttpServer()).post("/auth/login")
      .send({
        email: "email",
        password: "password"
      })
      .expect(201);
    return res.body.token;
  }

  afterEach(async () => {
    await orderRepository.delete({});
    await gameRepository.delete({});
  });

  afterAll(async() => {
    await app.close()
  });

  async function createOrder(): Promise<Order> {
    const token = await getAuthToken();
    const game = await gameRepository.findOne({ where: { title: 'title' } });
    const order = await request(app.getHttpServer())
      .post("/order/submit")
      .set('Authorization', 'Bearer ' + token)
      .send({
        game: game.id,
        phone: '123123123',
        email: 'email',
        description: 'description',
        price: 10,
        address: 'address',
        firstName: 'firstName',
        lastName: 'lastName',
        city: 'city',
        currency: 'EUR'
      })
      .expect(201);
    return order.body;
  }

  it('should return 201 and an order when creating a new order', async () => {
    const token = await getAuthToken();
    const game = await gameRepository.findOne({ where: { title: 'title' } });
    return request(app.getHttpServer())
      .post("/order/submit")
      .set('Authorization', 'Bearer ' + token)
      .send({
        game: game.id,
        phone: '123123123',
        email: 'email',
        description: 'description',
        price: 10,
        address: 'address',
        firstName: 'firstName',
        lastName: 'lastName',
        city: 'city',
        currency: 'EUR'
      })
      .expect(201)
      .expect(res => {
        expect(res.body).toBeDefined();
        expect(res.body.id).toBeDefined();
        expect(res.body.game).toBeDefined();
        expect(res.body.phone).toBe('123123123');
        expect(res.body.email).toBe('email');
        expect(res.body.description).toBe('description');
        expect(res.body.price).toBe(10);
        expect(res.body.address).toBe('address');
        expect(res.body.lastUpdate).toBeDefined();
        expect(res.body.firstName).toBe('firstName');
        expect(res.body.lastName).toBe('lastName');
        expect(res.body.city).toBe('city');
        expect(res.body.currency).toBe('EUR');
      });
  });

  it('should return my orders', async () => {
    await createOrder();
    const token = await getAuthToken();
    return request(app.getHttpServer())
      .get("/order/my-orders")
      .set('Authorization', 'Bearer ' + token)
      .expect(200)
      .expect(res => {
        expect(res.body.length).toBe(1);
        expect(res.body[0].game).toBeDefined();
        expect(res.body[0].phone).toBe('123123123');
        expect(res.body[0].email).toBe('email');
        expect(res.body[0].description).toBe('description');
        expect(res.body[0].price).toBe(10);
        expect(res.body[0].address).toBe('address');
        expect(res.body[0].lastUpdate).toBeDefined();
        expect(res.body[0].firstName).toBe('firstName');
        expect(res.body[0].lastName).toBe('lastName');
        expect(res.body[0].city).toBe('city');
        expect(res.body[0].currency).toBe('EUR');
      });
  });

  it('should return 401 when trying to get my orders without token', async () => {
    return request(app.getHttpServer())
      .get("/order/my-orders")
      .expect(401);
  });

  it('should return 401 when trying to get my orders with invalid token', async () => {
    return request(app.getHttpServer())
      .get("/order/my-orders")
      .set('Authorization', 'Bearer ' + 'invalid token')
      .expect(401);
  });

  it('should return 401 when trying to get my orders with empty token', async () => {
    return request(app.getHttpServer())
      .get("/order/my-orders")
      .set('Authorization', 'Bearer ' + '')
      .expect(401);
  });

  it("should return all orders", async () => {
    for (let i = 0; i < 10; i++) {
      await createOrder();
    }
    const token = await getAuthToken();
    return request(app.getHttpServer())
      .get("/order/all-orders")
      .set('Authorization', 'Bearer ' + token)
      .expect(200)
      .expect(res => {
        expect(res.body.length).toBe(10);
      });
  });

  it("should return 401 when trying to get all orders without token", async () => {
    return request(app.getHttpServer())
      .get("/order/all-orders")
      .expect(401);
  });

  it("should return 401 when trying to get all orders with invalid token", async () => {
    return request(app.getHttpServer())
      .get("/order/all-orders")
      .set('Authorization', 'Bearer ' + 'invalid token')
      .expect(401);
  });

  it("should return 401 when trying to get all orders with empty token", async () => {
    return request(app.getHttpServer())
      .get("/order/all-orders")
      .set('Authorization', 'Bearer ' + '')
      .expect(401);
  });

  it("should update order with given id", async () => {
    await createOrder();
    const token = await getAuthToken();
    const order = await orderRepository.findOne({ where: { email: 'email' } });
    return request(app.getHttpServer())
      .put(`/order/${order.id}`)
      .set('Authorization', 'Bearer ' + token)
      .send({
        phone: '45645646',

      })
      .expect(200)
      .expect(res => {
        expect(res.body.phone).toBe('45645646');
      });
  });

  it("should return 401 when trying to update order with given id without token", async () => {
    return request(app.getHttpServer())
      .put(`/order/1`)
      .expect(401);
  });

  it("should return 401 when trying to update order with given id with invalid token", async () => {
    return request(app.getHttpServer())
      .put(`/order/1`)
      .set('Authorization', 'Bearer ' + 'invalid token')
      .expect(401);
  });

  it("should return 401 when trying to update order with given id with empty token", async () => {
    return request(app.getHttpServer())
      .put(`/order/1`)
      .set('Authorization', 'Bearer ' + '')
      .expect(401);
  });

  it("should return 406 when trying to update order with given id with invalid id", async () => {
    const token = await getAuthToken();
    return request(app.getHttpServer())
      .put(`/order/-1`)
      .set('Authorization', 'Bearer ' + token)
      .expect(406);
  });

  it("should return 406 when trying to update order with given id with empty body", async () => {
    const token = await getAuthToken();
    return request(app.getHttpServer())
      .put(`/order/1`)
      .set('Authorization', 'Bearer ' + token)
      .send({})
      .expect(406);
  });

  it("should return trending games", async () => {
    for (let i = 0; i < 2; i++) {
      await createOrder();
    }
    return request(app.getHttpServer())
      .get(`/order/trending-games`)
      .expect(200)
      .expect(res => {
        expect(res.body.length).toBe(1);
      });
  });
});