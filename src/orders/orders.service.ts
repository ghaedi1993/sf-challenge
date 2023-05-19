import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './order.model';
import { FindOptions, OrdersRepository } from './orders.repository';
import * as moment from 'moment';
import axios from 'axios';
import { Trip, TripStatus } from 'src/trips/trip.model';
import {
  LATE_DELIVERY_STATUS,
  LateDelivery,
} from 'src/late-deliveries/late-delivery.model';
import { VendorsService } from 'src/vendors/vendors.service';
import { UsersService } from 'src/users/users.service';
import { Op } from 'sequelize';
import { Vendor } from 'src/vendors/vendor.model';
@Injectable()
export class OrdersService {
  constructor(
    private ordersRepository: OrdersRepository,
    @Inject(forwardRef(() => VendorsService))
    private vendorsService: VendorsService,
    private usersService: UsersService,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const { vendorId, customerId, eta } = createOrderDto;
    if (!eta) {
      throw new BadRequestException('Provide an eta');
    }
    if (!vendorId) {
      throw new BadRequestException('Provide vendorId');
    }
    if (!customerId) {
      throw new BadRequestException('Provide customerId');
    }
    const vendor = await this.vendorsService.findOne({ id: vendorId });
    const customer = await this.usersService.findOne({ id: customerId });
    if (!vendor) {
      throw new NotFoundException('Vendor not found');
    }
    if (!customer) {
      throw new NotFoundException('User not Found');
    }
    const delivery_time = moment().add(createOrderDto.eta, 'minutes').toDate();
    const order = {
      vendorId: createOrderDto.vendorId,
      customerId: createOrderDto.customerId,
      delivery_time,
      expected_delivery_time: delivery_time,
    };
    return this.ordersRepository.create(order);
  }
  async findAll(
    where: Partial<Order> = {},
    options: FindOptions = {},
  ): Promise<Order[]> {
    return this.ordersRepository.findAll(where, options);
  }

  async findOne(
    where: Partial<Order>,
    options: FindOptions = {},
  ): Promise<Order> {
    return this.ordersRepository.findOne(where, options);
  }
  async update(
    where: Partial<Order>,
    updateOrder: Partial<Order>,
  ): Promise<[number, Order[]]> {
    return this.ordersRepository.update(where, updateOrder);
  }

  async isLate(orderId: number): Promise<boolean> {
    const order = await this.findOne({ id: orderId }, { include: [Trip] });
    if (!order) {
      throw new BadRequestException('Invalid Order');
    }
    const currentTime = moment();
    const orderDeliverDueTime = moment(order.delivery_time);
    return currentTime.isAfter(orderDeliverDueTime);
  }
  async isNotLate(orderId: number): Promise<boolean> {
    const isLate = await this.isLate(orderId);
    return !isLate;
  }
  async hasLateDelivery(orderId: number): Promise<boolean> {
    const order = await this.findOne(
      { id: orderId },
      { include: [LateDelivery] },
    );
    if (!order) {
      throw new BadRequestException('Invalid Order');
    }
    return order.lateDeliveries.some(
      (lateDelivery) => lateDelivery.status !== LATE_DELIVERY_STATUS.DONE,
    );
  }
  async udpdateEta(orderId: number) {
    //  calling external function to get new eta
    const {
      data: {
        data: { eta },
      },
    } = await axios.get(
      'https://run.mocky.io/v3/122c2796-5df4-461c-ab75-87c1192b17f7',
    );
    // update eta
    await this.update(
      { id: orderId },
      { delivery_time: moment().add(eta, 'minutes').toDate() },
    );
  }
  async weeklyDelayReport() {
    // joining vendors with orders and then with trip filtering the orders created for this week
    // filter those others that deliveredAt in trip is after expected_deliver_time in order
    const startDate = moment().subtract(1, 'weeks').startOf('day').toDate();
    const endDate = moment().endOf('day').toDate();
    const thisWeekOrders = await this.findAll(
      {
        createdAt: {
          [Op.between]: [startDate, endDate],
        },
      },
      { include: [Trip, Vendor] },
    );

    const lateOrders = thisWeekOrders.filter((order) =>
      moment(order?.trip?.deliveredAt).isAfter(order.expected_delivery_time),
    );

    const vendorDelays = {};

    lateOrders.forEach((order) => {
      const vendorName = order.vendor.name;
      const deliveredAt = order.trip.deliveredAt;
      const expectedDeliverTime = order.expected_delivery_time;
      const status = order.trip.status;
      if (status == TripStatus.DELIVERED) {
        const delay = moment(deliveredAt).diff(
          moment(expectedDeliverTime),
          'minutes',
        );

        if (vendorDelays[vendorName]) {
          vendorDelays[vendorName] += delay;
        } else {
          vendorDelays[vendorName] = delay;
        }
      }
    });

    return vendorDelays;
  }
}
