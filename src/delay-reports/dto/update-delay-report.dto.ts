import { PartialType } from '@nestjs/swagger';
import { CreateDelayReportDto } from './create-delay-report.dto';

export class UpdateDelayReportDto extends PartialType(CreateDelayReportDto) {}
