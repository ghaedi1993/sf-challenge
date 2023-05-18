import { Module, forwardRef } from '@nestjs/common';
import { LateDeliveriesService } from './late-deliveries.service';
import { LateDeliveriesController } from './late-deliveries.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { LateDelivery } from './late-delivery.model';
import { LateDeliveriesRepository } from './late-deliveries.repository';
import { OrdersModule } from 'src/orders/orders.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [SequelizeModule.forFeature([LateDelivery]),
  forwardRef(()=>OrdersModule),
  UsersModule
],
  controllers: [LateDeliveriesController],
  providers: [LateDeliveriesService, LateDeliveriesRepository],
  exports: [LateDeliveriesService],
})
export class LateDeliveriesModule {}
