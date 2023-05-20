import { Test, TestingModule } from '@nestjs/testing';
import { LateDeliveriesService } from './late-deliveries.service';
import { LateDeliveriesRepository } from './late-deliveries.repository';
import { OrdersService } from '../orders/orders.service';
import { UsersService } from '../users/users.service';
import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';

describe('LateDeliveriesService', () => {
  let service: LateDeliveriesService;
  let repository: LateDeliveriesRepository;
  let ordersService: OrdersService;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LateDeliveriesService,
        LateDeliveriesRepository,
        OrdersService,
        UsersService,
      ],
    }).compile();

    service = module.get<LateDeliveriesService>(LateDeliveriesService);
    repository = module.get<LateDeliveriesRepository>(LateDeliveriesRepository);
    ordersService = module.get<OrdersService>(OrdersService);
    usersService = module.get<UsersService>(UsersService);
  });

  describe('create', () => {
    it('should create a new late delivery', async () => {
      const createLateDeliveryDto: CreateLateDeliveryDto = { orderId: 1 };

      const findOneSpy = jest
        .spyOn(ordersService, 'findOne')
        .mockResolvedValue({ id: 1, trip: { status: TripStatus.PENDING } });

      jest.spyOn(repository, 'create').mockResolvedValue({ id: 1 });

      const result = await service.create(createLateDeliveryDto);

      expect(findOneSpy).toHaveBeenCalledWith(
        { id: createLateDeliveryDto.orderId },
        { include: [Trip] },
      );
      expect(repository.create).toHaveBeenCalledWith(createLateDeliveryDto);
      expect(result).toEqual({ id: 1 });
    });

    it('should throw BadRequestException if orderId is not provided', async () => {
      const createLateDeliveryDto: CreateLateDeliveryDto = { orderId: null };

      await expect(service.create(createLateDeliveryDto)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw NotFoundException if order is not found', async () => {
      const createLateDeliveryDto: CreateLateDeliveryDto = { orderId: 1 };

      jest.spyOn(ordersService, 'findOne').mockResolvedValue(null);

      await expect(service.create(createLateDeliveryDto)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw ConflictException if order has already been delivered', async () => {
      const createLateDeliveryDto: CreateLateDeliveryDto = { orderId: 1 };

      jest
        .spyOn(ordersService, 'findOne')
        .mockResolvedValue({ id: 1, trip: { status: TripStatus.DELIVERED } });

      await expect(service.create(createLateDeliveryDto)).rejects.toThrow(
        ConflictException,
      );
    });

    // Add more test cases for other validation scenarios
  });

  describe('findAll', () => {
    it('should get all late deliveries', async () => {
      const lateDeliveries = [{ id: 1 }, { id: 2 }];

      jest.spyOn(repository, 'findAll').mockResolvedValue(lateDeliveries);

      const result = await service.findAll();

      expect(repository.findAll).toHaveBeenCalled();
      expect(result).toEqual(lateDeliveries);
    });
  });

  describe('findOne', () => {
    it('should get a single late delivery', async () => {
      const lateDeliveryId = 1;
      const lateDelivery = { id: 1 };

      jest.spyOn(repository, 'findOne').mockResolvedValue(lateDelivery);

      const result = await service.findOne({ id: lateDeliveryId });

      expect(repository.findOne).toHaveBeenCalledWith({ id: lateDeliveryId });
      expect(result).toEqual(lateDelivery);
    });
  });

  describe('fetchFromQueue', () => {
    it('should fetch a late delivery from the queue for a valid agent', async () => {
      const agentId = 1;
      const agent = { id: agentId, role: UserRole.AGENT, lateDeliveries: [] };
      const firstInQueue = {
        id: 1,
        status: LATE_DELIVERY_STATUS.WAITING,
        agentId: null,
      };

      jest.spyOn(usersService, 'findOne').mockResolvedValue(agent);
      jest.spyOn(repository, 'findOne').mockResolvedValue(firstInQueue);
      const updateSpy = jest
        .spyOn(service, 'update')
        .mockResolvedValue([1, [{ id: 1 }]]);

      const result = await service.fetchFromQueue(agentId);

      expect(usersService.findOne).toHaveBeenCalledWith(
        { id: agentId },
        { include: [LateDelivery] },
      );
      expect(repository.findOne).toHaveBeenCalledWith(
        { status: LATE_DELIVERY_STATUS.WAITING, agentId: null },
        { order: [['createdAt', 'ASC']] },
      );
      expect(updateSpy).toHaveBeenCalledWith(
        { id: firstInQueue.id },
        { status: LATE_DELIVERY_STATUS.PICKED, agentId },
      );
      expect(result).toEqual(firstInQueue);
    });

    // Add more test cases for other scenarios
  });

  describe('fullfil', () => {
    it('should update the status of a picked late delivery to DONE', async () => {
      const lateDeliveryId = 1;

      const updateSpy = jest
        .spyOn(service, 'update')
        .mockResolvedValue([1, [{ id: 1 }]]);

      const result = await service.fullfil(lateDeliveryId);

      expect(updateSpy).toHaveBeenCalledWith(
        { id: lateDeliveryId, status: LATE_DELIVERY_STATUS.PICKED },
        { status: LATE_DELIVERY_STATUS.DONE },
      );
      expect(result).toEqual([1, [{ id: 1 }]]);
    });
  });

  // Add more test suites for other methods in the LateDeliveriesService
});
