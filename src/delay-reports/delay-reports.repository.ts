import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { DelayReport } from './delay-report.model';
import { UpdateDelayReportDto } from './dto/update-delay-report.dto';
import { CreateDelayReportDto } from './dto/create-delay-report.dto';
import { FindOptions } from 'src/orders/orders.repository';

@Injectable()
export class DelayReportsRepository {
  constructor(
    @InjectModel(DelayReport)
    private delayReportModel: typeof DelayReport,
  ) {}

  async create(user: CreateDelayReportDto): Promise<DelayReport> {
    return this.delayReportModel.create({ ...user });
  }

  async findAll(
    where: Partial<DelayReport>,
    options: FindOptions = {},
  ): Promise<DelayReport[]> {
    const { include, order } = options;
    return this.delayReportModel.findAll({
      where: {
        ...where,
      },
      include,
      order,
    });
  }

  async findOne(
    where: Partial<DelayReport>,
    options: FindOptions = {},
  ): Promise<DelayReport> {
    const { include, order } = options;
    return this.delayReportModel.findOne({
      where: {
        ...where,
      },
      include,
      order,
    });
  }

  async findOneById(id: number): Promise<DelayReport> {
    return this.delayReportModel.findByPk(id);
  }

  async update(
    where: Partial<DelayReport>,
    updateDelayReportDto: UpdateDelayReportDto,
  ): Promise<[number, DelayReport[]]> {
    return this.delayReportModel.update(updateDelayReportDto, {
      where: { ...where },
      returning: true,
    });
  }
}
