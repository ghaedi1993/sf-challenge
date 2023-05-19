import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateTripDto {
  @IsNotEmpty()
  orderId: number;

  @IsOptional()
  deliveryDriverId?: number;
}
