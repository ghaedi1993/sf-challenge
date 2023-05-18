import { IsNotEmpty } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  vendorId: number;

  @IsNotEmpty()
  customerId: number;

  @IsNotEmpty()
  delivery_time: number;
}
