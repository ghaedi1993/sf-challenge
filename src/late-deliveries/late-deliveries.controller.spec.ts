import { Test, TestingModule } from '@nestjs/testing';
import { LateDeliveriesController } from './late-deliveries.controller';
import { LateDeliveriesService } from './late-deliveries.service';

describe('LateDeliveriesController', () => {
  let controller: LateDeliveriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LateDeliveriesController],
      providers: [LateDeliveriesService],
    }).compile();

    controller = module.get<LateDeliveriesController>(LateDeliveriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
