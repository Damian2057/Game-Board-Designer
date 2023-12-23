import * as request from "supertest";
import { INestApplication } from "@nestjs/common";
import { Container } from "../../../src/project/model/domain/container.entity";
import { Repository } from "typeorm";
import { User } from "../../../src/users/model/domain/user.entity";
import { ImageEntity } from "../../../src/image/model/domain/image.entity";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../../../src/app.module";
import { getRepositoryToken } from "@nestjs/typeorm";
import { UserRole } from "../../../src/users/model/domain/user.role.enum";
const bcrypt = require('bcrypt');

describe('ContainerController (integration)', () => {

  let app: INestApplication;
  let containerRepository: Repository<Container>;
  let userRepository: Repository<User>;
  let imageRepository: Repository<ImageEntity>;
  let imageId: number = 1;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    userRepository = moduleFixture.get<Repository<User>>(getRepositoryToken(User));
    containerRepository = moduleFixture.get<Repository<Container>>(getRepositoryToken(Container));
    imageRepository = moduleFixture.get<Repository<ImageEntity>>(getRepositoryToken(ImageEntity));

    await userRepository.delete({});
    await containerRepository.delete({});
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
    await containerRepository.delete({});
  });

  it('should update container', async () => {
    const token = await getAuthToken();
    const container = await containerRepository.save({
      name: "name",
      description: "description",
      notes: ["note1", "note2"],
      quantity: 1,
      elements: [],
      properties: [],
      imageIds: [imageId],
    });
    const res = await request(app.getHttpServer()).put(`/container/update-container/${container.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        description: "description2"
      })
      .expect(200);
    expect(res.body.description).toBe("description2");
  });

  it('should throw error when updating container with invalid id', async () => {
    const token = await getAuthToken();
    return request(app.getHttpServer()).put(`/container/update-container/0`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        description: "description2"
      })
      .expect(406);
  });

  it('should throw error when updating container with invalid token', async () => {
    const token = await getAuthToken();
    const container = await containerRepository.save({
      name: "name",
      description: "description",
      notes: ["note1", "note2"],
      quantity: 1,
      elements: [],
      properties: [],
      imageIds: [imageId],
    });
    return request(app.getHttpServer()).put(`/container/update-container/${container.id}`)
      .set('Authorization', `Bearer ${token}1`)
      .send({
        description: "description2"
      })
      .expect(401);
  });

  it('should get container by id', async () => {
    const token = await getAuthToken();
    const container = await containerRepository.save({
      name: "name",
      description: "description",
      notes: ["note1", "note2"],
      quantity: 1,
      elements: [],
      properties: [],
      imageIds: [imageId],
    });
    const res = await request(app.getHttpServer()).get(`/container/${container.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    expect(res.body.name).toBe("name");
    expect(res.body.description).toBe("description");
    expect(res.body.notes).toEqual(["note1", "note2"]);
    expect(res.body.quantity).toBe(1);
    expect(res.body.imageIds).toEqual([imageId]);
  });

  it('should get container elements by id', async () => {
    const token = await getAuthToken();
    const container = await containerRepository.save({
      name: "name",
      description: "description",
      notes: ["note1", "note2"],
      quantity: 1,
      elements: [],
      properties: [],
      imageIds: [imageId],
    });
    const res = await request(app.getHttpServer()).get(`/container/containers-elements/${container.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    expect(res.body).toEqual([]);
  });
});