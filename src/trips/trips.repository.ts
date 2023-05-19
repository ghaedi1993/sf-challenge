import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Trip } from './trip.model';
import { FindOptions } from 'src/orders/orders.repository';
import { CreateTripDto } from './dto/create-trip.dto';

@Injectable()
export class TripsRepository {
  constructor(
    @InjectModel(Trip)
    private tripModel: typeof Trip,
  ) {}

  async create(createTripDto: CreateTripDto): Promise<Trip> {
    return this.tripModel.create({ ...createTripDto });
  }

  async findAll(
    where: Partial<Trip>,
    options: FindOptions = {},
  ): Promise<Trip[]> {
    const { include, order } = options;
    return this.tripModel.findAll({
      where: {
        ...where,
      },
      include,
      order,
    });
  }

  async findOne(
    where: Partial<Trip>,
    options: FindOptions = {},
  ): Promise<Trip> {
    const { include, order } = options;
    return this.tripModel.findOne({
      where: {
        ...where,
      },
      include,
      order,
    });
  }

  async findOneById(id: number): Promise<Trip> {
    return this.tripModel.findByPk(id);
  }

  async update(
    where: Partial<Trip>,
    updateTrip: Partial<Trip>,
  ): Promise<[number, Trip[]]> {
    return this.tripModel.update(updateTrip, {
      where: { ...where },
      returning: true,
    });
  }
}
