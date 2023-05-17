import { Injectable } from '@nestjs/common';
import { CreateDelayReportDto } from './dto/create-delay-report.dto';
import { UpdateDelayReportDto } from './dto/update-delay-report.dto';
import { DelayReportsRepository } from './delay-reports.repository';
import { DelayReport } from './delay-report.model';

@Injectable()
export class DelayReportsService {
  constructor(private delayreportsRepository: DelayReportsRepository) {}

  async create(createDelayReportDto: CreateDelayReportDto) {
    return this.delayreportsRepository.create(createDelayReportDto);
  }
  async findAll(where:Partial<DelayReport>={}): Promise<DelayReport[]> {
    return this.delayreportsRepository.findAll(where);
  }

  findOne(where: Partial<DelayReport>): Promise<DelayReport> {
    return this.delayreportsRepository.findOne(where);
  }
  update(
    where: Partial<DelayReport>,
    updateDelayReportDto: UpdateDelayReportDto,
  ): Promise<[number, DelayReport[]]> {
    return this.delayreportsRepository.update(where, updateDelayReportDto);
  }
  async remove(id: number): Promise<number> {
    return this.delayreportsRepository.delete(id);
  }
}
