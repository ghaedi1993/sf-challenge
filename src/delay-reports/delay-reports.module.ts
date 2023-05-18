import { Module } from '@nestjs/common';
import { DelayReportsService } from './delay-reports.service';
import { DelayReportsController } from './delay-reports.controller';
import { DelayReportsRepository } from './delay-reports.repository';
import { SequelizeModule } from '@nestjs/sequelize';
import { DelayReport } from './delay-report.model';
import { OrdersModule } from 'src/orders/orders.module';
import { LateDeliveriesModule } from 'src/late-deliveries/late-deliveries.module';

@Module({
  imports: [
    SequelizeModule.forFeature([DelayReport]),
    OrdersModule,
    LateDeliveriesModule,
  ],
  controllers: [DelayReportsController],
  providers: [DelayReportsService, DelayReportsRepository],
  exports: [DelayReportsService],
})
export class DelayReportsModule {}
