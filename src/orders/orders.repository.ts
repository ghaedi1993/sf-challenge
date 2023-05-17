import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Order } from './order.model';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersRepository {
  constructor(
    @InjectModel(Order)
    private orderModel: typeof Order,
  ) {}

  async create(user: Partial<Order>): Promise<Order> {
    return this.orderModel.create({ ...user });
  }

  async findAll(where:Partial<Order>): Promise<Order[]> {
    return this.orderModel.findAll({
      where:{
        ...where
      }
    });
  }

  async findOne(where): Promise<Order> {
    return this.orderModel.findOne({
      where: {
        ...where,
      },
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
