import { Test, TestingModule } from '@nestjs/testing';
import { TripsController } from './trips.controller';
import { TripsService } from './trips.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { Trip } from './trip.model';

describe('TripsController', () => {
  let controller: TripsController;
  let service: TripsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TripsController],
      providers: [{
        provide:TripsService,
        useValue:{
          create: jest.fn(),
          findAll: jest.fn(),
          findOne: jest.fn(),
          update: jest.fn(),
        }
      }],
    }).compile();

    controller = module.get<TripsController>(TripsController);
    service = module.get<TripsService>(TripsService);
  });

  describe('findAll', () => {
    it('should get all trips', async () => {
      const trips = [{ id: 1 }, { id: 2 }];

      jest.spyOn(service, 'findAll').mockResolvedValue(trips as Trip[]);

      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual(trips);
    });
  });

  describe('create', () => {
    it('should create a new trip', async () => {
      const createTripDto: CreateTripDto = { orderId: 1 };

      jest.spyOn(service, 'create').mockResolvedValue({ id: 1 } as Trip);

      const result = await controller.create(createTripDto);

      expect(service.create).toHaveBeenCalledWith(createTripDto);
      expect(result).toEqual({ id: 1 });
    });
  });

  describe('update', () => {
    it('should update a trip', async () => {
      const id = '1';
      const updateTripDto: UpdateTripDto = { orderId: 1 };

      jest.spyOn(service, 'update').mockResolvedValue({ id: 1 } as any);

      const result = await controller.update(id, updateTripDto);

      expect(service.update).toHaveBeenCalledWith({ id: 1 }, updateTripDto);
      expect(result).toEqual({ id: 1 });
    });
  });
});
