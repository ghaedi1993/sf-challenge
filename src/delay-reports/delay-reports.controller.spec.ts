import { Test, TestingModule } from '@nestjs/testing';
import { DelayReportsController } from './delay-reports.controller';
import { DelayReportsService } from './delay-reports.service';
import { CreateDelayReportDto } from './dto/create-delay-report.dto';
import { UpdateDelayReportDto } from './dto/update-delay-report.dto';
import { DelayReport } from './delay-report.model';

describe('DelayReportsController', () => {
  let controller: DelayReportsController;
  let service: DelayReportsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DelayReportsController],
      providers: [{
        provide: DelayReportsService, 
        useValue:{
          create: jest.fn(),
          findAll: jest.fn(),
          findOne: jest.fn(),
          update: jest.fn(),
        }
      }],
    }).compile();

    controller = module.get<DelayReportsController>(DelayReportsController);
    service = module.get<DelayReportsService>(DelayReportsService);
  });

  describe('create', () => {
    it('should create a new delay report', async () => {
      const createDelayReportDto: CreateDelayReportDto = { orderId: 1 };

      jest.spyOn(service, 'create').mockResolvedValue({ id: 1, orderId: 1 } as DelayReport);

      const result = await controller.create(createDelayReportDto);

      expect(service.create).toHaveBeenCalledWith(createDelayReportDto);
      expect(result).toEqual({ id: 1 ,orderId: 1});
    });

    // Add more test cases if necessary
  });

  describe('findAll', () => {
    it('should get all delay reports', async () => {
      const delayReports = [{ id: 1 }, { id: 2 }];

      jest.spyOn(service, 'findAll').mockResolvedValue(delayReports as DelayReport[]);

      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual(delayReports);
    });

    // Add more test cases if necessary
  });

  describe('findOne', () => {
    it('should find a delay report by the given id', async () => {
      const id = '1';
      const delayReport = { id: 1 };

      jest.spyOn(service, 'findOne').mockResolvedValue(delayReport as DelayReport);

      const result = await controller.findOne(id);

      expect(service.findOne).toHaveBeenCalledWith({ id: +id });
      expect(result).toEqual(delayReport);
    });

    // Add more test cases if necessary
  });

  describe('update', () => {
    it('should update a delay report based on the given id', async () => {
      const id = '1';
      const updateDelayReportDto: UpdateDelayReportDto = { orderId: 1 };

      jest
        .spyOn(service, 'update')
        .mockResolvedValue([1, [{ id: 1, orderId: 1 }]] as [number, DelayReport[]]);

      const result = await controller.update(id, updateDelayReportDto);

      expect(service.update).toHaveBeenCalledWith(
        { id: +id },
        updateDelayReportDto,
      );
      expect(result).toEqual([1, [{ id: 1 , orderId:1}]]);
    });
  });
});
