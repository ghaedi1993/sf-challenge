import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';
import { Sequelize } from 'sequelize';
import { clearDB } from './util';
import { OrdersService } from 'src/orders/orders.service';
import { UserRole } from 'src/users/user.model';
import { TripsService } from 'src/trips/trips.service';
import { UsersService } from 'src/users/users.service';
import { VendorsService } from 'src/vendors/vendors.service';
import { DelayReportsService } from 'src/delay-reports/delay-reports.service';
import { TripStatus } from 'src/trips/trip.model';

describe('Late delivery Qeue (e2e)', () => {
  let app: INestApplication;
  let usersService: UsersService;
  let vendorsService: VendorsService;
  let ordersService: OrdersService;
  let tripsService: TripsService;
  let delayReportsService: DelayReportsService;
  let sequelize: Sequelize;
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    sequelize = app.get<'SEQUELIZE'>('SEQUELIZE') as unknown as Sequelize;
    usersService = moduleFixture.get<UsersService>(UsersService);
    vendorsService = moduleFixture.get<VendorsService>(VendorsService);
    ordersService = moduleFixture.get<OrdersService>(OrdersService);
    tripsService = moduleFixture.get<TripsService>(TripsService);
    delayReportsService =
      moduleFixture.get<DelayReportsService>(DelayReportsService);
    //Clear Database
    await Promise.all(await clearDB(sequelize.getQueryInterface()));
  });

  afterEach(async () => {
    await app.close();
    await sequelize.close();
  });

  it('/should not add to queue if trip is assigned', async () => {
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
      userIds.map((user) => usersService.create(user)),
    );
    const vendors = await Promise.all(
      vendorIds.map((vendor) => vendorsService.create(vendor)),
    );

    const ordersToCreate = [
      { customerId: users[0].id, vendorId: vendors[0].id, eta: 0 },
      { customerId: users[1].id, vendorId: vendors[0].id, eta: 0 },
      { customerId: users[2].id, vendorId: vendors[1].id, eta: 0 },
      { customerId: users[2].id, vendorId: vendors[1].id, eta: 0 },
    ];
    const orders = await Promise.all(
      ordersToCreate.map((orderTocreate) =>
        ordersService.create(orderTocreate),
      ),
    );
    // get orders for every vendor
    const vendor_1_orders = orders
      .filter((order) => order.vendorId == 1)
      .map((order) => order.id);
    const vendor_2_orders = orders
      .filter((order) => order.vendorId == 2)
      .map((order) => order.id);

    const tripsTocreate = [
      { orderId: orders[0].id },
      { orderId: orders[1].id },
      { orderId: orders[2].id },
      { orderId: orders[3].id },
    ];
    // trips created for all orders at the same time of order creation for simplicity
    // for vendor_1 we want to make it on time but for vendor_2 its going to be late
    const trips = await Promise.all(
      tripsTocreate.map((tripTocreate) => tripsService.create(tripTocreate)),
    );

    await Promise.all(
      trips.map((trip) => {
        // no change for vendor_1 related trips meaning they are still not asssigned
        if (vendor_1_orders.includes(trip.orderId)) {
          return;
        }
        // late but assigned
        if (vendor_2_orders.includes(trip.orderId)) {
          return tripsService.update(
            { id: trip.id },
            {
              status: TripStatus.ASSIGNED,
            },
          );
        }
      }),
    );
    // we try to create delay report for all
    await Promise.all(
      orders
        .map((order) => order.id)
        .map((orderId) => delayReportsService.create({ orderId })),
    );

    await request(app.getHttpServer())
      .get('/delay-reports')
      .expect(200)
      .expect((response) => {
        expect(response.body).toHaveLength(4);
      });
  });
});
