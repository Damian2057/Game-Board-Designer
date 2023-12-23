import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { User } from "../../../src/users/model/domain/user.entity";
import { Repository } from "typeorm";
import { Box } from "../../../src/project/model/domain/box.entity";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../../../src/app.module";
import { getRepositoryToken } from "@nestjs/typeorm";
import { UserRole } from "../../../src/users/model/domain/user.role.enum";
import { ImageEntity } from "../../../src/image/model/domain/image.entity";
import { Property } from "../../../src/project/model/domain/property.entity";
const bcrypt = require('bcrypt');

describe('PropertyController (integration)', () => {

  let app: INestApplication;
  let userRepository: Repository<User>;
  let boxRepository: Repository<Box>;
  let propertyRepository: Repository<Property>;
  let imageRepository: Repository<ImageEntity>;
  let imageId: number = 1;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    userRepository = moduleFixture.get<Repository<User>>(getRepositoryToken(User));
    boxRepository = moduleFixture.get<Repository<Box>>(getRepositoryToken(Box));
    imageRepository = moduleFixture.get<Repository<ImageEntity>>(getRepositoryToken(ImageEntity));
    propertyRepository = moduleFixture.get<Repository<Property>>(getRepositoryToken(Property));

    await userRepository.delete({});
    await boxRepository.delete({});
    await imageRepository.delete({});
    await propertyRepository.delete({});

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
    await boxRepository.delete({});
    await propertyRepository.delete({});
  });

  async function createBox(): Promise<Box> {
    const property = await propertyRepository.save({
      name: "property1",
      value: "value1"
    });
    await boxRepository.save({
      name: 'box2',
      description: 'description2',
      notes: ['note1', 'note2'],
      properties: [property],
      imageIds: [imageId]
    });
    const box = await boxRepository.findOne({
      where: {
        name: 'box2'
      },
      relations: {
        properties: true,
      }
    });
    return box;
  }

  it('should update box property', async () => {
    const token = await getAuthToken();
    const box = await createBox();
    return request(app.getHttpServer()).put(`/property/${box.properties[0].id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: "property1",
        value: "value2"
      }).expect(200)
      .then(async (res) => {
        const box = await boxRepository.findOne({ where: { name: 'box2' }, relations: ['properties'] });
        expect(box).toBeDefined();
        expect(box.properties[0].value).toEqual('value2');
      });
  });

  it('should throw error when updating box property with invalid token', async () => {
    const box = await createBox();
    return request(app.getHttpServer()).put(`/property/${box.properties[0].id}`)
      .send({
        name: "property1",
        value: "value2"
      }).expect(401);
  });

  it('should get box property by id', async () => {
    const token = await getAuthToken();
    const box = await createBox();
    return request(app.getHttpServer()).get(`/property/${box.properties[0].id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .then(async (res) => {
        expect(res.body.name).toEqual('property1');
        expect(res.body.value).toEqual('value1');
      });
  });

  it('should delete box property by id', async () => {
    const token = await getAuthToken();
    const box = await createBox();
    return request(app.getHttpServer()).delete(`/property/${box.properties[0].id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .then(async (res) => {
        const box = await boxRepository.findOne({ where: { name: 'box2' }, relations: ['properties'] });
        expect(box).toBeDefined();
        expect(box.properties.length).toEqual(0);
      });
  });
});