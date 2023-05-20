import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersRepository } from './orders.repository';
import { VendorsService } from 'src/vendors/vendors.service';
import { UsersService } from 'src/users/users.service';
import { ConfigService } from '@nestjs/config';
import { Vendor } from 'src/vendors/vendor.model';
import { User } from 'src/users/user.model';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './order.model';

describe('OrdersService', () => {
  let service: OrdersService;
  let repository: OrdersRepository;
  let vendorsService: VendorsService;
  let usersService: UsersService;
  let configService: ConfigService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        {
          provide: OrdersRepository,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            findOneById: jest.fn(),
          },
        },
        {
          provide: UsersService,
          useValue: {
            findOne: jest.fn(),
          },
        },
        {
          provide: VendorsService,
          useValue: {
            findOne: jest.fn(),
          },
        },
        ConfigService,
      ],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
    repository = module.get<OrdersRepository>(OrdersRepository);
    vendorsService = module.get<VendorsService>(VendorsService);
    usersService = module.get<UsersService>(UsersService);
    configService = module.get<ConfigService>(ConfigService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('create', () => {
    it('should create a new order', async () => {
      // Mock dependencies
      const createOrderDto = {
        vendorId: 1,
        customerId: 1,
        eta: 10,
      };
      const vendor = { id: 1, name: 'Vendor 1' } as Vendor;
      const customer = { id: 1, username: 'Customer 1' } as User;
      const { eta, ...rest } = createOrderDto;
      const order = {
        id: 1,
        ...rest,
      } as Order;

      jest.spyOn(vendorsService, 'findOne').mockResolvedValue(vendor);
      jest.spyOn(usersService, 'findOne').mockResolvedValue(customer);
      jest.spyOn(repository, 'create').mockResolvedValue(order);

      // Test the method
      const result = await service.create(createOrderDto);

      // Assertions
      expect(vendorsService.findOne).toHaveBeenCalledWith({ id: 1 });
      expect(usersService.findOne).toHaveBeenCalledWith({ id: 1 });
      expect(repository.create).toHaveBeenCalledWith({
        vendorId: 1,
        customerId: 1,
        delivery_time: expect.any(Date),
        expected_delivery_time: expect.any(Date),
      });
      expect(result).toEqual(order);
    });

    it('should throw BadRequestException if eta is not provided', async () => {
      // Test the method
      const createOrderDto = {
        vendorId: 1,
        customerId: 1,
      } as CreateOrderDto;

      await expect(service.create(createOrderDto)).rejects.toThrowError(
        BadRequestException,
      );
    });
  });
});
