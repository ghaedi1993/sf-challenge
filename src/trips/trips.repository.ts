import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Trip } from './trip.model';
import { UpdateTripDto } from './dto/update-trip.dto';
import { FindOptions } from 'src/orders/orders.repository';

@Injectable()
export class TripsRepository {
  constructor(
    @InjectModel(Trip)
    private tripModel: typeof Trip,
  ) {}

  async create(trip: Partial<Trip>): Promise<Trip> {
    return this.tripModel.create({ ...trip });
  }

  async findAll(
    where: Partial<Trip>,
    options:FindOptions = {}
  ): Promise<Trip[]> {
    const {include , order} = options; 
    return this.tripModel.findAll({
      where: {
        ...where,
      },
      include,
      order
    });
  }

  async findOne(
    where: Partial<Trip>,
    options:FindOptions = {}
  ): Promise<Trip> {
    const {include , order} = options; 
    return this.tripModel.findOne({
      where: {
        ...where,
      },
      include,
      order
    });
  }

  async findOneById(id: number): Promise<Trip> {
    return this.tripModel.findByPk(id);
  }

  async update(
    where: Partial<Trip>,
    updateTripDto: UpdateTripDto,
  ): Promise<[number, Trip[]]> {
    return this.tripModel.update(updateTripDto, {
      where: { ...where },
      returning: true,
    });
  }

  async delete(id: number): Promise<number> {
    return this.tripModel.destroy({ where: { id } });
  }
}
