import { Module } from '@nestjs/common';
import { DelayReportsService } from './delay-reports.service';
import { DelayReportsController } from './delay-reports.controller';
import { DelayReportsRepository } from './delay-reports.repository';
import { SequelizeModule } from '@nestjs/sequelize';
import { DelayReport } from './delay-report.model';

@Module({
  imports: [SequelizeModule.forFeature([DelayReport])],
  controllers: [DelayReportsController],
  providers: [DelayReportsService, DelayReportsRepository],
  exports: [DelayReportsService],
})
export class DelayReportsModule {}
