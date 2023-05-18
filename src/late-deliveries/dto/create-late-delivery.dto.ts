import { IsNotEmpty } from 'class-validator';

export class CreateLateDeliveryDto {
  @IsNotEmpty()
  orderId: number;
}
