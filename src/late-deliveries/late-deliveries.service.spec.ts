import { Test, TestingModule } from '@nestjs/testing';
import { LateDeliveriesService } from './late-deliveries.service';

describe('LateDeliveriesService', () => {
  let service: LateDeliveriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LateDeliveriesService],
    }).compile();

    service = module.get<LateDeliveriesService>(LateDeliveriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
