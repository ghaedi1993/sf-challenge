import { IsNotEmpty } from 'class-validator';

export class CreateDelayReportDto {
  @IsNotEmpty()
  orderId: number;
}
