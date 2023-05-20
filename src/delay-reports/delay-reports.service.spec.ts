import { Test, TestingModule } from '@nestjs/testing';
import { DelayReportsService } from './delay-reports.service';
import { DelayReportsRepository } from './delay-reports.repository';
import { OrdersService } from 'src/orders/orders.service';
import { LateDeliveriesService } from 'src/late-deliveries/late-deliveries.service';
import { CreateDelayReportDto } from './dto/create-delay-report.dto';

describe('DelayReportsService', () => {
  let service: DelayReportsService;
  let repository: DelayReportsRepository;
  let ordersService: OrdersService;
  let lateDeliveriesService: LateDeliveriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DelayReportsService,
        DelayReportsRepository,
        OrdersService,
        LateDeliveriesService,
      ],
    }).compile();

    service = module.get<DelayReportsService>(DelayReportsService);
    repository = module.get<DelayReportsRepository>(DelayReportsRepository);
    ordersService = module.get<OrdersService>(OrdersService);
    lateDeliveriesService = module.get<LateDeliveriesService>(
      LateDeliveriesService,
    );
  });

  describe('create', () => {
    it('should create a new delay report', async () => {
      const createDelayReportDto: CreateDelayReportDto = { orderId: 1 };

      jest
        .spyOn(ordersService, 'findOne')
        .mockResolvedValue({ id: 1, trip: { status: 'IN_PROGRESS' } });
      jest.spyOn(repository, 'create').mockResolvedValue({ id: 1 });

      const result = await service.create(createDelayReportDto);

      expect(ordersService.findOne).toHaveBeenCalledWith(
        { id: createDelayReportDto.orderId },
        { include: [Trip, DelayReport, LateDelivery] },
      );
      expect(repository.create).toHaveBeenCalledWith({
        orderId: createDelayReportDto.orderId,
      });
      expect(result).toEqual({ id: 1 });
    });

    it('should throw BadRequestException if orderId is not provided', async () => {
      const createDelayReportDto: CreateDelayReportDto = { orderId: 1 };

      createDelayReportDto.orderId = undefined;

      await expect(service.create(createDelayReportDto)).rejects.toThrow(
        BadRequestException,
      );
      expect(ordersService.findOne).not.toHaveBeenCalled();
      expect(repository.create).not.toHaveBeenCalled();
    });

    it('should throw ConflictException if the order is already delivered', async () => {
      const createDelayReportDto: CreateDelayReportDto = { orderId: 1 };

      jest
        .spyOn(ordersService, 'findOne')
        .mockResolvedValue({ id: 1, trip: { status: 'DELIVERED' } });

      await expect(service.create(createDelayReportDto)).rejects.toThrow(
        ConflictException,
      );
      expect(ordersService.findOne).toHaveBeenCalledWith(
        { id: createDelayReportDto.orderId },
        { include: [Trip, DelayReport, LateDelivery] },
      );
      expect(repository.create).not.toHaveBeenCalled();
    });

    // Add more test cases to cover different scenarios
  });

  describe('findAll', () => {
    it('should get all delay reports', async () => {
      const delayReports = [{ id: 1 }, { id: 2 }];

      jest.spyOn(repository, 'findAll').mockResolvedValue(delayReports);

      const result = await service.findAll();

      expect(repository.findAll).toHaveBeenCalled();
      expect(result).toEqual(delayReports);
    });

    // Add more test cases if necessary
  });

  describe('findOne', () => {
    it('should find a delay report by the given conditions', async () => {
      const conditions = { id: 1 };
      const delayReport = { id: 1 };

      jest.spyOn(repository, 'findOne').mockResolvedValue(delayReport);

      const result = await service.findOne(conditions);

      expect(repository.findOne).toHaveBeenCalledWith(conditions);
      expect(result).toEqual(delayReport);
    });

    // Add more test cases if necessary
  });

  describe('update', () => {
    it('should update a delay report based on the given conditions', async () => {
      const conditions = { id: 1 };
      const updateDelayReportDto = { status: 'UPDATED' };

      jest.spyOn(repository, 'update').mockResolvedValue([1, [{ id: 1 }]]);

      const result = await service.update(conditions, updateDelayReportDto);

      expect(repository.update).toHaveBeenCalledWith(
        conditions,
        updateDelayReportDto,
      );
      expect(result).toEqual([1, [{ id: 1 }]]);
    });

    // Add more test cases if necessary
  });

  // Add more test suites for other methods in the DelayReportsService
});
