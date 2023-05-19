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
import { LateDeliveriesService } from 'src/late-deliveries/late-deliveries.service';
import * as moment from 'moment';

describe('Delay Reports (e2e)', () => {
  let app: INestApplication;
  let usersRepository: UsersRepository;
  let vendorsRepository: VendorsRepository;
  let ordersService: OrdersService;
  let tripsService: TripsService;
  let lateDeliveriesService: LateDeliveriesService;
  let sequelize: Sequelize;
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    sequelize = app.get<'SEQUELIZE'>('SEQUELIZE') as unknown as Sequelize;
    usersRepository = moduleFixture.get<UsersRepository>(UsersRepository);
    vendorsRepository = moduleFixture.get<VendorsRepository>(VendorsRepository);
    ordersService = moduleFixture.get<OrdersService>(OrdersService);
    tripsService = moduleFixture.get<TripsService>(TripsService);
    lateDeliveriesService = moduleFixture.get<LateDeliveriesService>(
      LateDeliveriesService,
    );
    //Clear Database
    await Promise.all(await clearDB(sequelize.getQueryInterface()));
  });

  afterEach(async () => {
    await app.close();
    await sequelize.close();
  });

  it('/late-deliveries (GET)', () => {
    return request(app.getHttpServer())
      .get('/late-deliveries')
      .expect(200)
      .expect([]);
  });

  it('/late-deliveries create witout orderId', async () => {
    await request(app.getHttpServer())
      .post('/late-deliveries')
      .send({})
      .expect(400);
  });

  it('/late-deliveries create with a fake orderId', async () => {
    await request(app.getHttpServer())
      .post('/late-deliveries')
      .send({ orderId: 1 })
      .expect(404);
  });

  it('/late-deliveries create late-deliveries and get (POST)(GET)', async () => {
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
    // update orders to make them late
    await Promise.all(
      orders.map((order) =>
        ordersService.update(
          { id: order.id },
          { delivery_time: moment().subtract(100, 'minutes').toDate() },
        ),
      ),
    );
    const lateDeliveries = [
      { orderId: orders[0].id },
      { orderId: orders[1].id },
      { orderId: orders[2].id },
      { orderId: orders[3].id },
    ];
    await Promise.all(
      lateDeliveries.map((lateDelivery) =>
        lateDeliveriesService.create(lateDelivery),
      ),
    );

    return request(app.getHttpServer())
      .get('/late-deliveries')
      .expect(200)
      .expect((response) => {
        expect(response.body).toHaveLength(4);
      });
  });
});
