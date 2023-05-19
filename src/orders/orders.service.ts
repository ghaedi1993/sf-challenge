import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './order.model';
import { FindOptions, OrdersRepository } from './orders.repository';
import * as moment from 'moment';
import axios from 'axios';
import { Trip } from 'src/trips/trip.model';
import {
  LATE_DELIVERY_STATUS,
  LateDelivery,
} from 'src/late-deliveries/late-delivery.model';
import { VendorsService } from 'src/vendors/vendors.service';
import { UsersService } from 'src/users/users.service';
@Injectable()
export class OrdersService {
  constructor(
    private ordersRepository: OrdersRepository,
    private vendorsService:VendorsService,
    private usersService:UsersService
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const {vendorId,customerId} = createOrderDto;
    if(!vendorId){
      throw new BadRequestException("Provide vendorId")
    }
    if(!customerId){
      throw new BadRequestException("Provide customerId")
    }
    const vendor = await this.vendorsService.findOne({id:vendorId}); 
    const customer = await this.usersService.findOne({id:customerId}); 
    if(!vendor){
      throw new NotFoundException("Vendor not found")
    }
    if(!customer){
      throw new NotFoundException("User not Found")
    }
    return this.ordersRepository.create(createOrderDto);
  }
  async findAll(where: Partial<Order> = {}): Promise<Order[]> {
    return this.ordersRepository.findAll(where);
  }

  async findOne(
    where: Partial<Order>,
    options: FindOptions = {},
  ): Promise<Order> {
    return this.ordersRepository.findOne(where, options);
  }
  async update(
    where: Partial<Order>,
    updateOrderDto: UpdateOrderDto,
  ): Promise<[number, Order[]]> {
    return this.ordersRepository.update(where, updateOrderDto);
  }

  async isLate(orderId: number): Promise<boolean> {
    const order = await this.findOne({ id: orderId }, { include: [Trip] });
    if (!order) {
      throw new BadRequestException('Invalid Order');
    }
    const currentTime = moment();
    const orderDeliverDueTime = moment(order.createdAt).add(
      order.delivery_time,
      'minutes',
    );
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
    await this.update({ id: orderId }, { delivery_time: eta });
  }
}
