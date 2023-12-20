import { INestApplication } from "@nestjs/common";
import { Repository } from "typeorm";
import { Tag } from "../../../src/game/model/domain/tag.entity";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../../../src/app.module";
import { getRepositoryToken } from "@nestjs/typeorm";
import * as request from "supertest";
import { User } from "../../../src/users/model/domain/user.entity";
import { UserRole } from "../../../src/users/model/domain/user.role.enum";
const bcrypt = require('bcrypt');

describe('TagController (integration)', () => {

  let app: INestApplication;
  let tagRepository: Repository<Tag>
  let userRepository: Repository<User>

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    tagRepository = moduleFixture.get<Repository<Tag>>(getRepositoryToken(Tag));
    userRepository = moduleFixture.get<Repository<User>>(getRepositoryToken(User));

    await tagRepository.delete({});
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

  function createTag(name: string) {
    const tag: Tag = new Tag();
    tag.name = name;
    return tag;
  }

  beforeEach(async () => {
    const tag: Tag = createTag('tag');
    const tag2: Tag = createTag('tag2');
    await tagRepository.save([tag, tag2]);
  });

  afterEach(async () => {
    await tagRepository.delete({});
  });

  afterAll(async () => {
    await app.close();
  });

  it('should return all tags', async () => {
    return request(app.getHttpServer()).get('/tag/all')
      .expect(200)
      .expect((res) => {
        expect(res.body.length).toEqual(2);
      });
  });

  it('should return tags by name', async () => {
    const token = await getAuthToken();
    return request(app.getHttpServer()).get('/tag/find?name=tag')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.length).toEqual(1);
      });
  });

  it('should create a tag', async () => {
    const token = await getAuthToken();
    return request(app.getHttpServer()).post('/tag/create')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'tag3'
      })
      .expect(201)
      .expect((res) => {
        expect(res.body.name).toEqual('tag3');
      });
  });

  it('should update a tag', async () => {
    const token = await getAuthToken();
    const tag = await tagRepository.findOneBy({name: 'tag'});
    return request(app.getHttpServer()).put(`/tag/update/${tag.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'tag4'
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.name).toEqual('tag4');
      });
  });

  it('should delete a tag', async () => {
    const token = await getAuthToken();
    const tag = await tagRepository.findOneBy({name: 'tag'});
    return request(app.getHttpServer()).delete(`/tag/delete/${tag.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.message).toEqual('success');
      });
  });
});