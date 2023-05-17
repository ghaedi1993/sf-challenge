import { Test, TestingModule } from '@nestjs/testing';
import { DelayReportsService } from './delay-reports.service';

describe('DelayReportsService', () => {
  let service: DelayReportsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DelayReportsService],
    }).compile();

    service = module.get<DelayReportsService>(DelayReportsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
