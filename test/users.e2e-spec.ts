import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';
import { Sequelize } from 'sequelize';
import { clearDB } from './util';
import { UserRole } from 'src/users/user.model';

describe('Users (e2e)', () => {
  let app: INestApplication;
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    const sequelize = app.get<'SEQUELIZE'>('SEQUELIZE') as unknown as Sequelize;
    //Clear Database
    await Promise.all(await clearDB(sequelize.getQueryInterface()));
  });

  afterEach(async () => {
    await app.close();
  });

  it('/users (GET)', () => {
    return request(app.getHttpServer()).get('/users').expect(200).expect([]);
  });

  it('/users (POST)', () => {
    const newUser = {
      username: 'javad@gmail.com',
      role: UserRole.CUSTOMER,
    };
    return request(app.getHttpServer())
      .post('/users')
      .send({ ...newUser })
      .expect(201)
      .expect((response) => {
        expect(response.body).toHaveProperty('username', newUser.username);
        expect(response.body).toHaveProperty('role', newUser.role);
      });
  });
});
