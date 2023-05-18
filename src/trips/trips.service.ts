import { Injectable } from '@nestjs/common';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { TripsRepository } from './trips.repository';
import { Trip } from './trip.model';

@Injectable()
export class TripsService {
  constructor(private tripsRepository: TripsRepository) {}

  async create(createTripDto: CreateTripDto) {
    return this.tripsRepository.create(createTripDto);
  }
  async findAll(where: Partial<Trip> = {},options={}): Promise<Trip[]> {
    return this.tripsRepository.findAll(where,options);
  }

  async findOne(where: Partial<Trip>,options={}): Promise<Trip> {
    return this.tripsRepository.findOne(where,options);
  }

  async update(
    where: Partial<Trip>,
    updateTripDto: UpdateTripDto,
  ): Promise<[number, Trip[]]> {
    return this.tripsRepository.update(where, updateTripDto);
  }
  async remove(id: number): Promise<number> {
    return this.tripsRepository.delete(id);
  }
}
