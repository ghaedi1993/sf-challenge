import { PartialType } from '@nestjs/swagger';
import { CreateLateDeliveryDto } from './create-late-delivery.dto';

export class UpdateLateDeliveryDto extends PartialType(CreateLateDeliveryDto) {}
