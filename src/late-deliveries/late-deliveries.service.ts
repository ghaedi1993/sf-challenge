import { Injectable } from '@nestjs/common';
import { CreateLateDeliveryDto } from './dto/create-late-delivery.dto';
import { UpdateLateDeliveryDto } from './dto/update-late-delivery.dto';
import { LateDelivery } from './late-delivery.model';
import { LateDeliveriesRepository } from './late-deliveries.repository';

@Injectable()
export class LateDeliveriesService {
  constructor(private lateDeliveriesRepository: LateDeliveriesRepository) {}

  async create(createLateDeliveryDto: CreateLateDeliveryDto) {
    return this.lateDeliveriesRepository.create(createLateDeliveryDto);
  }
  async findAll(where: Partial<LateDelivery> = {}): Promise<LateDelivery[]> {
    return this.lateDeliveriesRepository.findAll(where);
  }

  findOne(where: Partial<LateDelivery>): Promise<LateDelivery> {
    return this.lateDeliveriesRepository.findOne(where);
  }
  update(
    where: Partial<LateDelivery>,
    updateLateDeliveryDto: UpdateLateDeliveryDto,
  ): Promise<[number, LateDelivery[]]> {
    return this.lateDeliveriesRepository.update(where, updateLateDeliveryDto);
  }
  async remove(id: number): Promise<number> {
    return this.lateDeliveriesRepository.delete(id);
  }
}
