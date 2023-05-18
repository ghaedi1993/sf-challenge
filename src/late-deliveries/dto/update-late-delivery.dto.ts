import { PartialType } from '@nestjs/swagger';
import { CreateLateDeliveryDto } from './create-late-delivery.dto';
import { LATE_DELIVERY_STATUS } from '../late-delivery.model';
import { IsEnum, IsNumber } from 'class-validator';

export class UpdateLateDeliveryDto extends PartialType(CreateLateDeliveryDto) {
    @IsEnum(LATE_DELIVERY_STATUS)
    status: LATE_DELIVERY_STATUS;
    @IsNumber()
    agentId?:number
}
