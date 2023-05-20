import { PartialType } from '@nestjs/swagger';
import { CreateTripDto } from './create-trip.dto';
import { IsOptional } from 'class-validator';

export class UpdateTripDto extends PartialType(CreateTripDto) {
  @IsOptional()
  orderId: number;
}
