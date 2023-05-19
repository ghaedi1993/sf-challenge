import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';
import { Sequelize } from 'sequelize';
import { clearDB } from './util';
import { UserRole } from 'src/users/user.model';
import { UsersRepository } from 'src/users/users.repository';
import { VendorsRepository } from 'src/vendors/vendors.repository';
import { OrdersService } from 'src/orders/orders.service';

describe('Orders (e2e)', () => {
  let app: INestApplication;
  let usersRepository: UsersRepository;
  let vendorsRepository: VendorsRepository;
  let ordersService: OrdersService;
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

    //Clear Database
    await Promise.all(await clearDB(sequelize.getQueryInterface()));
  });

  afterEach(async () => {
    await app.close();
    await sequelize.close();
  });

  it('/orders (GET)', () => {
    return request(app.getHttpServer()).get('/orders').expect(200).expect([]);
  });

  it('/orders create witout orderId and vendorId(POST)', async () => {
    await request(app.getHttpServer()).post('/orders').send({}).expect(400);
  });

  it('/orders create with a fake orderId and vendorId(POST)', async () => {
    const fakeCustomerId = 1;
    const fakeVendorId = 1;

    await request(app.getHttpServer())
      .post('/orders')
      .send({ vendorId: fakeVendorId, customerId: fakeCustomerId, eta: 10 })
      .expect(404);
  });
  it('/orders create(POST)', async () => {
    const customer = await usersRepository.create({
      username: 'customer_1@gmail.com',
      role: UserRole.CUSTOMER,
    });
    const vendor = await vendorsRepository.create({ name: 'vendor_1' });

    // Persist the user records to the database
    await request(app.getHttpServer())
      .post('/orders')
      .send({ vendorId: vendor.id, customerId: customer.id, eta: 10 })
      .expect(201);
  });
  it('/orders create and get (POST)(GET)', async () => {
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
    await Promise.all(
      ordersToCreate.map((orderTocreate) =>
        ordersService.create(orderTocreate),
      ),
    );

    return request(app.getHttpServer())
      .get('/orders')
      .expect(200)
      .expect((response) => {
        expect(response.body).toHaveLength(4);
      });
  });
});
