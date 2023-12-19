import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from "../../../src/app.module";

describe('GameController (integration)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async() => {
    await app.close()
  })

  it('/game/all (GET)', () => {
    return request(app.getHttpServer())
      .get('/game/all')
      .expect(200)
      .expect('Hello World!');
  });
});