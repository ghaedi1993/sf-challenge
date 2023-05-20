import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './order.model';
import { UpdateOrderDto } from './dto/update-order.dto';

describe('OrdersController', () => {
  let controller: OrdersController;
  let service: OrdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [
        {
          provide: OrdersService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            isLate: jest.fn(),
            updateEta: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<OrdersController>(OrdersController);
    service = module.get<OrdersService>(OrdersService);
  });

  describe('create', () => {
    it('should create a new order', async () => {
      const createOrderDto: CreateOrderDto = {
        vendorId: 1,
        customerId: 1,
        eta: 20,
      };
      const { eta, ...order } = createOrderDto;
      jest.spyOn(service, 'create').mockResolvedValue(order as Order);

      const result = await controller.create(createOrderDto);

      expect(service.create).toHaveBeenCalledWith(createOrderDto);
      expect(result).toEqual(order);
    });
  });

  describe('findAll', () => {
    it('should get all orders', async () => {
      const orders = [
        { id: 1, vendorId: 1, customerId: 1 },
        { id: 2, vendorId: 2, customerId: 2 },
      ] as Order[];

      jest.spyOn(service, 'findAll').mockResolvedValue(orders);

      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual(orders);
    });
  });

  describe('findOne', () => {
    it('should get a single order', async () => {
      const orderId = '1';
      const order = { id: 1 } as Order;

      jest.spyOn(service, 'findOne').mockResolvedValue(order);

      const result = await controller.findOne(orderId);

      expect(service.findOne).toHaveBeenCalledWith({ id: 1 });
      expect(result).toEqual(order);
    });
  });

  describe('update', () => {
    it('should update an order', async () => {
      const orderId = '1';
      const updateOrderDto: UpdateOrderDto = { customerId: 1 };

      jest
        .spyOn(service, 'update')
        .mockResolvedValue([1, [{ id: 1 }]] as [number, Order[]]);

      const result = await controller.update(orderId, updateOrderDto);

      expect(service.update).toHaveBeenCalledWith({ id: 1 }, updateOrderDto);
      expect(result).toEqual([1, [{ id: 1 }]]);
    });
  });
});
