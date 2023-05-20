import { Test, TestingModule } from '@nestjs/testing';
import { TripsService } from './trips.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { TripsRepository } from './trips.repository';
import { UsersService } from '../users/users.service';
import { User, UserRole } from '../users/user.model';
import { OrdersService } from '../orders/orders.service';
import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { Trip, TripStatus } from './trip.model';
import { Order } from 'src/orders/order.model';

describe('TripsService', () => {
  let service: TripsService;
  let tripsRepository: TripsRepository;
  let usersService: UsersService;
  let ordersService: OrdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TripsService,
        {
          provide: TripsRepository,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
          },
        },
        {
          provide: UsersService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
          },
        },
        {
          provide: OrdersService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<TripsService>(TripsService);
    tripsRepository = module.get<TripsRepository>(TripsRepository);
    usersService = module.get<UsersService>(UsersService);
    ordersService = module.get<OrdersService>(OrdersService);
  });

  describe('create', () => {
    it('should create a new trip', async () => {
      const createTripDto: CreateTripDto = {
        deliveryDriverId: 1,
        orderId: 1,
      };
      const orderWithTrip = {
        id: 1,
        deliveryDriverId: createTripDto.deliveryDriverId,
        vendorId: 1,
        delivery_time: new Date(),
        expected_delivery_time: new Date(),
      } as unknown as Order;

      jest.spyOn(usersService, 'findOne').mockResolvedValue({
        role: UserRole.DELIVERY_DRIVER,
      } as User);
      jest.spyOn(ordersService, 'findOne').mockResolvedValue(orderWithTrip);
      jest
        .spyOn(tripsRepository, 'create')
        .mockResolvedValue({ id: 1 } as Trip);

      const result = await service.create(createTripDto);

      expect(usersService.findOne).toHaveBeenCalledWith({
        id: createTripDto.deliveryDriverId,
      });
      expect(ordersService.findOne).toHaveBeenCalledWith({
        id: createTripDto.orderId,
      });
      expect(tripsRepository.create).toHaveBeenCalledWith(createTripDto);
      expect(result).toEqual({ id: 1 });
    });

    it('should throw BadRequestException if orderId is not provided', async () => {
      const createTripDto = {
        deliveryDriverId: 1,
      } as CreateTripDto;

      await expect(service.create(createTripDto)).rejects.toThrowError(
        BadRequestException,
      );
    });

    it('should throw BadRequestException if deliveryDriverId is not a valid DELIVERY_DRIVER', async () => {
      const createTripDto: CreateTripDto = {
        deliveryDriverId: 1,
        orderId: 1,
      };

      jest.spyOn(usersService, 'findOne').mockResolvedValue({
        role: UserRole.CUSTOMER,
      } as User);

      await expect(service.create(createTripDto)).rejects.toThrowError(
        BadRequestException,
      );
    });

    it('should throw NotFoundException if order does not exist', async () => {
      const createTripDto: CreateTripDto = {
        deliveryDriverId: 1,
        orderId: 1,
      };

      jest.spyOn(usersService, 'findOne').mockResolvedValue({
        role: UserRole.DELIVERY_DRIVER,
      } as User);
      jest.spyOn(ordersService, 'findOne').mockResolvedValue(null);

      await expect(service.create(createTripDto)).rejects.toThrowError(
        NotFoundException,
      );
    });

    it('should throw ConflictException if order already has a trip', async () => {
      const createTripDto: CreateTripDto = {
        deliveryDriverId: 1,
        orderId: 1,
      };

      const orderWithTrip = {
        id: 1,
        trip: { id: 1 },
      };

      jest.spyOn(usersService, 'findOne').mockResolvedValue({
        role: UserRole.DELIVERY_DRIVER,
      } as User);
      jest
        .spyOn(ordersService, 'findOne')
        .mockResolvedValue(orderWithTrip as any);

      await expect(service.create(createTripDto)).rejects.toThrowError(
        ConflictException,
      );
    });
  });

  describe('findAll', () => {
    it('should get all trips', async () => {
      const trips = [{ id: 1 }, { id: 2 }];

      jest.spyOn(tripsRepository, 'findAll').mockResolvedValue(trips as Trip[]);

      const result = await service.findAll();

      expect(tripsRepository.findAll).toHaveBeenCalled();
      expect(result).toEqual(trips);
    });
  });

  describe('findOne', () => {
    it('should get a trip by where condition', async () => {
      const where = { id: 1 };
      const trip = { id: 1 } as Trip;

      jest.spyOn(tripsRepository, 'findOne').mockResolvedValue(trip);

      const result = await service.findOne(where);
      console.log(tripsRepository.findOne);
      expect(tripsRepository.findOne).toHaveBeenCalledWith(where);

      expect(result).toEqual(trip);
    });
  });

  describe('update', () => {
    it('should update trips based on where condition', async () => {
      const where = { id: 1 };
      const updateTrip = { status: TripStatus.DELIVERED };
      const updatedTrip = [1, { id: 1, status: TripStatus.DELIVERED }];

      jest
        .spyOn(tripsRepository, 'update')
        .mockResolvedValue(updatedTrip as [number, Trip[]]);

      const result = await service.update(where, updateTrip);

      expect(tripsRepository.update).toHaveBeenCalledWith(where, updateTrip);
      expect(result).toEqual(updatedTrip);
    });
  });
});
