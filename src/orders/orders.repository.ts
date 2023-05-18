import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Order } from './order.model';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Includeable } from 'sequelize';

export interface FindOptions {
  order?: [string, 'ASC' | 'DESC'][];
  include?: Includeable[];
}

@Injectable()
export class OrdersRepository {
  constructor(
    @InjectModel(Order)
    private orderModel: typeof Order,
  ) {}

  async create(user: Partial<Order>): Promise<Order> {
    return this.orderModel.create({ ...user });
  }

  async findAll(
    where: Partial<Order>,
    options: FindOptions = {},
  ): Promise<Order[]> {
    const { include, order } = options;
    return this.orderModel.findAll({
      where: {
        ...where,
      },
      include,
      order,
    });
  }

  async findOne(
    where: Partial<Order>,
    options: FindOptions = {},
  ): Promise<Order> {
    const { include, order } = options;
    return this.orderModel.findOne({
      where: {
        ...where,
      },
      include,
      order,
    });
  }

  async findOneById(id: number): Promise<Order> {
    return this.orderModel.findByPk(id);
  }

  async update(
    where: Partial<Order>,
    updateOrderDto: UpdateOrderDto,
  ): Promise<[number, Order[]]> {
    return this.orderModel.update(updateOrderDto, {
      where: { ...where },
      returning: true,
    });
  }
  async delete(id: number): Promise<number> {
    return this.orderModel.destroy({ where: { id } });
  }
}
