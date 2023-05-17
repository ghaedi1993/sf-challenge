import { Test, TestingModule } from '@nestjs/testing';
import { DelayReportsController } from './delay-reports.controller';
import { DelayReportsService } from './delay-reports.service';

describe('DelayReportsController', () => {
  let controller: DelayReportsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DelayReportsController],
      providers: [DelayReportsService],
    }).compile();

    controller = module.get<DelayReportsController>(DelayReportsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
