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
const bcrypt = require('bcrypt');
describe('BoxController (integration)', () => {

  let app: INestApplication;
  let userRepository: Repository<User>;
  let boxRepository: Repository<Box>;
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

    await userRepository.delete({});
    await boxRepository.delete({});
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
    await boxRepository.delete({});
  });

  it('POST /box/create-new-box (admin)', async () => {
    const token = await getAuthToken();
    return request(app.getHttpServer()).post('/box/create-new-box')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'box2',
        description: 'description2',
        notes: ['note1', 'note2'],
        properties: [{
          name: "property1",
          value: "value1"
        }],
        imageIds: [imageId]
      }).expect(201)
      .then(async (res) => {
        const box = await boxRepository.findOne({ where: { name: 'box2' } });
        expect(box).toBeDefined();
        expect(box.name).toEqual('box2');
        expect(box.description).toEqual('description2');
        expect(box.notes).toEqual(['note1', 'note2']);
        expect(box.imageIds).toEqual([imageId]);
      });
  });

  it("should getAll EmptyBox List", async () => {
    const token = await getAuthToken();
    return request(app.getHttpServer()).get("/box/all")
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.length).toEqual(0);
      });
  });

  it("should getAll Box List", async () => {
    const token = await getAuthToken();
    await boxRepository.save({
      name: "box",
      description: "description",
      notes: ["note1", "note2"],
      imageIds: [imageId],
    });
    return request(app.getHttpServer()).get("/box/all")
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.length).toEqual(1);
      });
  });

  it("should get Box by id", async () => {
    const token = await getAuthToken();
    const box = await boxRepository.save({
      name: "box",
      description: "description",
      notes: ["note1", "note2"],
      imageIds: [imageId],
    });
    return request(app.getHttpServer()).get(`/box/${box.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.name).toEqual('box');
        expect(res.body.description).toEqual('description');
        expect(res.body.notes).toEqual(['note1', 'note2']);
        expect(res.body.imageIds).toEqual([imageId]);
      });
  });

  it("should get Box by id", async () => {
    const token = await getAuthToken();
    return request(app.getHttpServer()).get(`/box/-1`)
      .set('Authorization', `Bearer ${token}`)
      .expect(406);
  });

  it("should update Box", async () => {
    const token = await getAuthToken();
    const box = await boxRepository.save({
      name: "box",
      description: "description",
      notes: ["note1", "note2"],
      imageIds: [imageId],
    });
    return request(app.getHttpServer()).put(`/box/update-box/${box.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        description: 'description2'
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.description).toEqual('description2');
        expect(res.body.imageIds).toEqual([imageId]);
      });
  });

  it("should update Box", async () => {
    const token = await getAuthToken();
    return request(app.getHttpServer()).put(`/box/update-box/-1`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        description: 'description2'
      })
      .expect(406);
  });

  it("should add property to Box", async () => {
    const token = await getAuthToken();
    const box = await boxRepository.save({
      name: "box",
      description: "description",
      notes: ["note1", "note2"],
      imageIds: [imageId],
    });
    return request(app.getHttpServer()).put(`/box/property-box/${box.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'property1',
        value: 'value1'
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.properties[0].name).toEqual('property1');
      });
  });

  it("should add property to Box", async () => {
    const token = await getAuthToken();
    return request(app.getHttpServer()).put(`/box/property-box/-1`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'property1',
        value: 'value1'
      })
      .expect(406);
  });
});