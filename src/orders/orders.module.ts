import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Order } from './order.model';
import { OrdersRepository } from './orders.repository';
import { DelayReportsModule } from 'src/delay-reports/delay-reports.module';
import { LateDeliveriesModule } from 'src/late-deliveries/late-deliveries.module';

@Module({
  imports: [SequelizeModule.forFeature([Order]), LateDeliveriesModule],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepository],
  exports: [OrdersService],
})
export class OrdersModule {}
