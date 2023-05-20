import { Test, TestingModule } from '@nestjs/testing';
import { VendorsController } from './vendors.controller';
import { VendorsService } from './vendors.service';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';
import { Vendor } from './vendor.model';
import { VendorsRepository } from './vendors.repository';

// jest.mock('src/', () => ({
//   __esModule: true,
//   OrdersModule: {
//     register: jest.fn(() => ({
//       compile: jest.fn(),
//     })),
//   },
// }));

describe('VendorsController', () => {
  let vendorsService: VendorsService;
  let vendorsController: VendorsController;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VendorsController,
        {
          provide: VendorsService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            delayReport: jest.fn()
          },
        }
      ],
    }).compile();

    vendorsService = module.get<VendorsService>(VendorsService);
    vendorsController = module.get<VendorsController>(VendorsController);
  });

  


  describe('create', () => {
    it('should be defined', () => {
      expect(vendorsService).toBeDefined();
      expect(vendorsController).toBeDefined();
    });
    it('should create a new vendor', async () => {
      const createVendorDto: CreateVendorDto = { name: 'vendor 1' };
      const createdVendor = { id: 1, ...createVendorDto };

      const createSpy = jest.spyOn(vendorsService, 'create').mockResolvedValue(createdVendor as Vendor);
      const result = await vendorsController.create(createVendorDto);

      expect(createSpy).toHaveBeenCalledWith(createVendorDto);
      expect(result).toEqual(createdVendor);
    });
  });

  describe('getDelayReport', () => {
    it('should get the delay report', async () => {
      const delayReport = { 'vendor 1': 10 };

      jest.spyOn(vendorsService, 'delayReport').mockResolvedValue(delayReport);

      const result = await vendorsController.getDelayReport();

      expect(vendorsService.delayReport).toHaveBeenCalled();
      expect(result).toEqual(delayReport);
    });
  });

  describe('findAll', () => {
    it('should get all vendors', async () => {
      const vendors = [{ id: 1, name: 'vendor 1' }];

      jest.spyOn(vendorsService, 'findAll').mockResolvedValue(vendors as any);

      const result = await vendorsController.findAll();

      expect(vendorsService.findAll).toHaveBeenCalled();
      expect(result).toEqual(vendors);
    });
  });

  describe('update', () => {
    it('should update a vendor', async () => {
      const id = '1';
      const updateVendorDto: UpdateVendorDto = { name: 'Updated Vendor' };
      const updatedVendor = { id: 1, name: 'Updated Vendor' };

      jest.spyOn(vendorsService, 'update').mockResolvedValue(updatedVendor as any);

      const result = await vendorsController.update(id, updateVendorDto);

      expect(vendorsService.update).toHaveBeenCalledWith({ id: 1 }, updateVendorDto);
      expect(result).toEqual(updatedVendor);
    });
  });
});
