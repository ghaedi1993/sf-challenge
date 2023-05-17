import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './order.model';
import { OrdersRepository } from './orders.repository';

@Injectable()
export class OrdersService {
  constructor(private ordersRepository: OrdersRepository) {}

  async create(createOrderDto: CreateOrderDto) {
    return this.ordersRepository.create(createOrderDto);
  }
  async findAll(where:Partial<Order>={}): Promise<Order[]> {
    return this.ordersRepository.findAll(where);
  }

  findOne(where: Partial<Order>): Promise<Order> {
    return this.ordersRepository.findOne(where);
  }
  update(
    where: Partial<Order>,
    updateOrderDto: UpdateOrderDto,
  ): Promise<[number, Order[]]> {
    return this.ordersRepository.update(where, updateOrderDto);
  }
  async remove(id: number): Promise<number> {
    return this.ordersRepository.delete(id);
  }
}
