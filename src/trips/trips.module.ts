import { Module } from '@nestjs/common';
import { TripsService } from './trips.service';
import { TripsController } from './trips.controller';
import { TripsRepository } from './trips.repository';
import { SequelizeModule } from '@nestjs/sequelize';
import { Trip } from './trip.model';

@Module({
  imports: [SequelizeModule.forFeature([Trip])],
  controllers: [TripsController],
  providers: [TripsService, TripsRepository],
})
export class TripsModule {}
