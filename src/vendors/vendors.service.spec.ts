import { Test, TestingModule } from '@nestjs/testing';
import { VendorsService } from './vendors.service';
import { VendorsRepository } from './vendors.repository';
import { OrdersService } from 'src/orders/orders.service';

describe('VendorsService', () => {
  let vendorsService: VendorsService;
  let vendorsRepository: VendorsRepository;
  let ordersService: OrdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VendorsService,
        {
          provide: VendorsRepository,
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
            weeklyDelayReport: jest.fn(),
          },
        },
      ],
    }).compile();

    vendorsService = module.get<VendorsService>(VendorsService);
    vendorsRepository = module.get<VendorsRepository>(VendorsRepository);
    ordersService = module.get<OrdersService>(OrdersService);
  });

  describe('create', () => {
    it('should be defined', () => {
      expect(vendorsService).toBeDefined();
      expect(vendorsRepository).toBeDefined();
      expect(ordersService).toBeDefined();
    });
    it('should call vendorsRepository.create with the provided vendor', async () => {
      const createSpy = jest.spyOn(vendorsRepository, 'create');

      const vendor = { name: 'Vendor A' };
      await vendorsService.create(vendor);

      expect(createSpy).toHaveBeenCalledWith(vendor);
    });
  });

  describe('findAll', () => {
    it('should call vendorsRepository.findAll with the provided where parameter', async () => {
      const findAllSpy = jest.spyOn(vendorsRepository, 'findAll');

      const where = {};
      await vendorsService.findAll(where);

      expect(findAllSpy).toHaveBeenCalledWith(where);
    });
  });

  describe('findOne', () => {
    it('should call vendorsRepository.findOne', async () => {
      const findOneSpy = jest.spyOn(vendorsRepository, 'findOne');

      const where = { id: 1 };
      await vendorsService.findOne(where);

      expect(findOneSpy).toHaveBeenCalledWith(where);
    });
  });

  describe('update', () => {
    it('should call vendorsRepository.update with the provided where and updateVendorDto parameters', async () => {
      const updateSpy = jest.spyOn(vendorsRepository, 'update');

      const where = { id: 1 };
      const updateVendorDto = { name: 'Updated Vendor' };
      await vendorsService.update(where, updateVendorDto);

      expect(updateSpy).toHaveBeenCalledWith(where, updateVendorDto);
    });
  });

  describe('delayReport', () => {
    it('should call ordersService.weeklyDelayReport', async () => {
      const weeklyDelayReportSpy = jest.spyOn(
        ordersService,
        'weeklyDelayReport',
      );

      await vendorsService.delayReport();

      expect(weeklyDelayReportSpy).toHaveBeenCalled();
    });
  });
});
