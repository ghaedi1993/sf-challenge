import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Trip } from './trip.model';
import { UpdateTripDto } from './dto/update-trip.dto';

@Injectable()
export class TripsRepository {
  constructor(
    @InjectModel(Trip)
    private tripModel: typeof Trip,
  ) {}

  async create(trip: Partial<Trip>): Promise<Trip> {
    return this.tripModel.create({ ...trip });
  }

  async findAll(where: Partial<Trip>): Promise<Trip[]> {
    return this.tripModel.findAll({
      where: {
        ...where,
      },
    });
  }

  async findOne(where: Partial<Trip>): Promise<Trip> {
    return this.tripModel.findOne({
      where: {
        ...where,
      },
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
