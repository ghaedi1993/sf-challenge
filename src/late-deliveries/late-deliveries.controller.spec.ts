import { Test, TestingModule } from '@nestjs/testing';
import { LateDeliveriesController } from './late-deliveries.controller';
import { LateDeliveriesService } from './late-deliveries.service';
import { CreateLateDeliveryDto } from './dto/create-late-delivery.dto';
import { LATE_DELIVERY_STATUS, LateDelivery } from './late-delivery.model';

describe('LateDeliveriesController', () => {
  let controller: LateDeliveriesController;
  let service: LateDeliveriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LateDeliveriesController],
      providers: [{
        provide:LateDeliveriesService,
        useValue:{
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            fetchFromQueue: jest.fn(),
            fullfil: jest.fn()
        }
      }],
    }).compile();

    controller = module.get<LateDeliveriesController>(LateDeliveriesController);
    service = module.get<LateDeliveriesService>(LateDeliveriesService);
  });

  describe('create', () => {
    it('should create a new late delivery', async () => {
      const createLateDeliveryDto: CreateLateDeliveryDto = { orderId: 1 };

      jest.spyOn(service, 'create').mockResolvedValue({ id: 1 } as LateDelivery);

      const result = await controller.create(createLateDeliveryDto);

      expect(service.create).toHaveBeenCalledWith(createLateDeliveryDto);
      expect(result).toEqual({ id: 1 });
    });
  });

  describe('fetchFromQueue', () => {
    it('should fetch a late delivery from the queue for a valid agent', async () => {
      const agentId = 1;
      const lateDelivery = {
        id: 1,
        status: LATE_DELIVERY_STATUS.WAITING,
        agentId: null,
      };

      jest.spyOn(service, 'fetchFromQueue').mockResolvedValue(lateDelivery as LateDelivery);

      const result = await controller.fetchFromQueue(agentId);

      expect(service.fetchFromQueue).toHaveBeenCalledWith(agentId);
      expect(result).toEqual(lateDelivery);
    });
  });

  describe('findAll', () => {
    it('should get all late deliveries', async () => {
      const lateDeliveries = [{ id: 1 }, { id: 2 }];

      jest.spyOn(service, 'findAll').mockResolvedValue(lateDeliveries as LateDelivery[]);

      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual(lateDeliveries);
    });
  });

  describe('fullfil', () => {
    it('should update the status of a picked late delivery to DONE', async () => {
      const lateDeliveryId = 1;

      jest.spyOn(service, 'fullfil').mockResolvedValue([1, [{ id: 1 , status:LATE_DELIVERY_STATUS.DONE }]] as [number,LateDelivery[]]);

      const result = await controller.fullfil(lateDeliveryId);

      expect(service.fullfil).toHaveBeenCalledWith(lateDeliveryId);
      expect(result).toEqual([1, [{ id: 1 , status:LATE_DELIVERY_STATUS.DONE }]]);
    });
  });
});
