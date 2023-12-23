import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { User } from "../../../src/users/model/domain/user.entity";
import { Repository } from "typeorm";
import { Element } from "../../../src/project/model/domain/element.entity";
import { ImageEntity } from "../../../src/image/model/domain/image.entity";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../../../src/app.module";
import { getRepositoryToken } from "@nestjs/typeorm";
import { UserRole } from "../../../src/users/model/domain/user.role.enum";
const bcrypt = require('bcrypt');

describe('ElementController (integration)', () => {

  let app: INestApplication;
  let userRepository: Repository<User>;
  let elementRepository: Repository<Element>;
  let imageRepository: Repository<ImageEntity>;
  let imageId: number = 1;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    userRepository = moduleFixture.get<Repository<User>>(getRepositoryToken(User));
    elementRepository = moduleFixture.get<Repository<Element>>(getRepositoryToken(Element));
    imageRepository = moduleFixture.get<Repository<ImageEntity>>(getRepositoryToken(ImageEntity));

    await userRepository.delete({});
    await elementRepository.delete({});
    await imageRepository.delete({});

    await userRepository.save({
      username: "username",
      email: "email",
      password: await bcrypt.hash("password", 12),
      isActive: true,
      phoneNumber: "123123123",
      role: UserRole.ADMIN
    });

    await imageRepository.save({
      filename: "filename",
      mimetype: "mimetype",
    });

    imageId = (await imageRepository.findOne({ where: { filename: "filename" } })).id;

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

  afterEach(async () => {
    await elementRepository.delete({});
  });

  it('should upload an element', async () => {
    const token = await getAuthToken();
    const element = await elementRepository.save({
      name: "name",
      description: "description",
      notes: ["note1", "note2"],
      quantity: 1,
      properties: [{
        name: "property",
        value: "value",
      }],
      imageIds: [imageId]
    });
    return request(app.getHttpServer()).put(`/element/update-element/${element.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        description: "description2"
      })
      .expect(200)
      .then(async (res) => {
        const element = await elementRepository.findOne({ where: { name: 'name' } });
        expect(element).toBeDefined();
        expect(element.description).toEqual('description2');
      });
  });

  it('should return 401 Unauthorized', async () => {
    return request(app.getHttpServer())
      .put("/element/update-element/1")
      .send({
        description: "description2"
      })
      .expect(401);
  });

  it('should return element by id', async () => {
    const token = await getAuthToken();
    const element = await elementRepository.save({
      name: "name",
      description: "description",
      notes: ["note1", "note2"],
      quantity: 1,
      properties: [{
        name: "property",
        value: "value",
      }],
      imageIds: [imageId]
    });
    return request(app.getHttpServer()).get(`/element/${element.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .then(async (res) => {
        const element = await elementRepository.findOne({ where: { name: 'name' } });
        expect(element).toBeDefined();
        expect(element.description).toEqual('description');
      });
  });

  it('should return 406 Not Acceptable', async () => {
    const token = await getAuthToken();
    return request(app.getHttpServer()).get(`/element/-1`)
      .set('Authorization', `Bearer ${token}`)
      .expect(406);
  });

  it('should delete element by id', async () => {
    const token = await getAuthToken();
    const element = await elementRepository.save({
      name: "name",
      description: "description",
      notes: ["note1", "note2"],
      quantity: 1,
      properties: [{
        name: "property",
        value: "value",
      }],
      imageIds: [imageId]
    });
    return request(app.getHttpServer()).delete(`/element/delete-element/${element.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .then(async (res) => {
        expect(res.body.message).toEqual('success');
      });
  });

  it('should return 406 Not Acceptable', async () => {
    const token = await getAuthToken();
    return request(app.getHttpServer()).delete(`/element/delete-element/-1`)
      .set('Authorization', `Bearer ${token}`)
      .expect(406);
  });
});