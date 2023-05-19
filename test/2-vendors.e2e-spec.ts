import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';
import { Sequelize } from 'sequelize';
import { clearDB } from './util';

describe('Vendors (e2e)', () => {
  let app: INestApplication;
  let sequelize: Sequelize;
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    sequelize = app.get<'SEQUELIZE'>('SEQUELIZE') as unknown as Sequelize;
    //Clear Database
    await Promise.all(await clearDB(sequelize.getQueryInterface()));
  });

  afterEach(async () => {
    await app.close();
    await sequelize.close();
  });

  it('/vendors (GET)', () => {
    return request(app.getHttpServer()).get('/vendors').expect(200).expect([]);
  });

  it('/vendors (POST)', () => {
    const newVendor = {
      name: 'Snapfood',
    };
    return request(app.getHttpServer())
      .post('/vendors')
      .send({ ...newVendor })
      .expect(201)
      .expect((response) => {
        expect(response.body).toHaveProperty('name', newVendor.name);
      });
  });
});
