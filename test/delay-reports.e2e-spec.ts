import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';
import { Sequelize } from 'sequelize';
import { clearDB } from './util';
import { UsersRepository } from 'src/users/users.repository';
import { OrdersService } from 'src/orders/orders.service';
import { VendorsRepository } from 'src/vendors/vendors.repository';
import { UserRole } from 'src/users/user.model';
import { TripsService } from 'src/trips/trips.service';
import { DelayReportsService } from 'src/delay-reports/delay-reports.service';

describe('Delay Reports (e2e)', () => {
  let app: INestApplication;
  let usersRepository: UsersRepository;
  let vendorsRepository: VendorsRepository;
  let ordersService: OrdersService;
  let tripsService: TripsService;
  let delayReportsService:DelayReportsService
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    const sequelize = app.get<'SEQUELIZE'>('SEQUELIZE') as unknown as Sequelize;
    usersRepository = moduleFixture.get<UsersRepository>(UsersRepository);
    vendorsRepository = moduleFixture.get<VendorsRepository>(VendorsRepository);
    ordersService = moduleFixture.get<OrdersService>(OrdersService);
    tripsService = moduleFixture.get<TripsService>(TripsService);
    delayReportsService = moduleFixture.get<DelayReportsService>(DelayReportsService);
    //Clear Database
    await Promise.all(await clearDB(sequelize.getQueryInterface()));
  });

  afterEach(async () => {
    await app.close();
  });

  it('/delay-reports (GET)', () => {
    return request(app.getHttpServer()).get('/delay-reports').expect(200).expect([]);
  });

  it('/delay-reports create witout orderId', async () => {
    await request(app.getHttpServer()).post('/delay-reports').send({}).expect(400);
  });

  it('/delay-report create with a fake orderId and vendorId(POST)', async () => {
    await request(app.getHttpServer())
      .post('/trips')
      .send({ orderId: 1 })
      .expect(404);
  });

  it('/delay-reports create delay-reports and get (POST)(GET)', async () => {
    const userIds = [
      { username: 'customer_1@gmail.com', role: UserRole.CUSTOMER },
      { username: 'customer_2@gmail.com', role: UserRole.CUSTOMER },
      { username: 'customer_3@gmail.com', role: UserRole.CUSTOMER },
    ];
    const vendorIds = [
      {
        name: 'vendor_1',
      },
      { name: 'vendor_2' },
    ];

    const users = await Promise.all(
      userIds.map((user) => usersRepository.create(user)),
    );
    const vendors = await Promise.all(
      vendorIds.map((vendor) => vendorsRepository.create(vendor)),
    );

    const ordersToCreate = [
      { customerId: users[0].id, vendorId: vendors[0].id, eta: 10 },
      { customerId: users[1].id, vendorId: vendors[1].id, eta: 20 },
      { customerId: users[2].id, vendorId: vendors[1].id, eta: 30 },
      { customerId: users[2].id, vendorId: vendors[1].id, eta: 20 },
    ];
    const orders = await Promise.all(
      ordersToCreate.map((orderTocreate) =>
        ordersService.create(orderTocreate),
      ),
    );
    const delayReports = [
      { orderId: orders[0].id },
      { orderId: orders[1].id },
      { orderId: orders[2].id },
      { orderId: orders[3].id },
    ];
    await Promise.all(
      delayReports.map((delayReport) => delayReportsService.create(delayReport)),
    );

    return request(app.getHttpServer())
      .get('/delay-reports')
      .expect(200)
      .expect((response) => {
        expect(response.body).toHaveLength(4);
      });
  });
});
