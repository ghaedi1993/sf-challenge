import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';
import { Sequelize } from 'sequelize';
import { clearDB } from './util';
import { UserRole } from 'src/users/user.model';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

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

  it('/users (POST)', async () => {
    const customer = {
      username: 'customer@gmail.com',
      role: UserRole.CUSTOMER,
    };

    await request(app.getHttpServer())
      .post('/users')
      .send({ ...customer })
      .expect(201)
      .expect((response) => {
        expect(response.body).toHaveProperty('username', customer.username);
        expect(response.body).toHaveProperty('role', customer.role);
      });
  });
  it('/user (POST) (GET)', async () => {
    const agent = {
      username: 'agent@gmail.com',
      role: UserRole.AGENT,
    };
    const deliveryDriver: CreateUserDto = {
      username: 'deliver_driver@gmail.com',
      role: UserRole.DELIVERY_DRIVER,
    };
    await request(app.getHttpServer())
      .post('/users')
      .send({ ...agent })
      .expect(201)
      .expect((response) => {
        expect(response.body).toHaveProperty('username', agent.username);
        expect(response.body).toHaveProperty('role', agent.role);
      });
    await request(app.getHttpServer())
      .post('/users')
      .send({ ...deliveryDriver })
      .expect(201)
      .expect((response) => {
        expect(response.body).toHaveProperty(
          'username',
          deliveryDriver.username,
        );
        expect(response.body).toHaveProperty('role', deliveryDriver.role);
      });
    await request(app.getHttpServer())
      .get('/users')
      .expect(200)
      .expect((response) => {
        expect(response.body).toHaveLength(2);
        const containsAgentRole = response.body.some(
          (obj: CreateUserDto) => obj.role === UserRole.AGENT,
        );
        expect(containsAgentRole).toBe(true);
        const containsDeliveryDriverRole = response.body.some(
          (obj: CreateUserDto) => obj.role === UserRole.DELIVERY_DRIVER,
        );
        expect(containsDeliveryDriverRole).toBe(true);
        const containsCustomerRole = response.body.some(
          (obj: CreateUserDto) => obj.role === UserRole.CUSTOMER,
        );
        expect(containsCustomerRole).not.toBe(true);
      });
  });
});
