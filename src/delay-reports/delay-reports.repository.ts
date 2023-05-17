import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { DelayReport } from './delay-report.model';
import { UpdateDelayReportDto } from './dto/update-delay-report.dto';
import { CreateDelayReportDto } from './dto/create-delay-report.dto';

@Injectable()
export class DelayReportsRepository {
  constructor(
    @InjectModel(DelayReport)
    private delayReportModel: typeof DelayReport,
  ) {}

  async create(user: CreateDelayReportDto): Promise<DelayReport> {
    return this.delayReportModel.create({ ...user });
  }

  async findAll(where:Partial<DelayReport>): Promise<DelayReport[]> {
    return this.delayReportModel.findAll({
      where:{
        ...where
      }
    });
  }

  async findOne(where): Promise<DelayReport> {
    return this.delayReportModel.findOne({
      where: {
        ...where,
      },
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
  async delete(id: number): Promise<number> {
    return this.delayReportModel.destroy({ where: { id } });
  }
}
