import { Module } from '@nestjs/common';
import { LateDeliveriesService } from './late-deliveries.service';
import { LateDeliveriesController } from './late-deliveries.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { LateDelivery } from './late-delivery.model';
import { LateDeliveriesRepository } from './late-deliveries.repository';

@Module({
  imports: [SequelizeModule.forFeature([LateDelivery])],
  controllers: [LateDeliveriesController],
  providers: [LateDeliveriesService, LateDeliveriesRepository],
  exports: [LateDeliveriesService],
})
export class LateDeliveriesModule {}
