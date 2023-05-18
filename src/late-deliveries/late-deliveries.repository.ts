import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { LateDelivery } from './late-delivery.model';
import { UpdateLateDeliveryDto } from './dto/update-late-delivery.dto';
import { CreateLateDeliveryDto } from './dto/create-late-delivery.dto';
import { FindOptions } from 'src/orders/orders.repository';

@Injectable()
export class LateDeliveriesRepository {
  constructor(
    @InjectModel(LateDelivery)
    private lateDeliveryModel: typeof LateDelivery,
  ) {}

  async create(
    createLateDeliveryDto: CreateLateDeliveryDto,
  ): Promise<LateDelivery> {
    return this.lateDeliveryModel.create({ ...createLateDeliveryDto });
  }

  async findAll(
    where: Partial<LateDelivery>,
    options: FindOptions = {},
  ): Promise<LateDelivery[]> {
    const { include, order } = options;
    return this.lateDeliveryModel.findAll({
      where: {
        ...where,
      },
      include,
      order,
    });
  }

  async findOne(
    where: Partial<LateDelivery>,
    options: FindOptions = {},
  ): Promise<LateDelivery> {
    const { include, order } = options;
    return this.lateDeliveryModel.findOne({
      where: {
        ...where,
      },
      include,
      order,
    });
  }

  async findOneById(id: number): Promise<LateDelivery> {
    return this.lateDeliveryModel.findByPk(id);
  }

  async update(
    where: Partial<LateDelivery>,
    updateLateDeliveryDto: UpdateLateDeliveryDto,
  ): Promise<[number, LateDelivery[]]> {
    return this.lateDeliveryModel.update(updateLateDeliveryDto, {
      where: { ...where },
      returning: true,
    });
  }
  async delete(id: number): Promise<number> {
    return this.lateDeliveryModel.destroy({ where: { id } });
  }
}
