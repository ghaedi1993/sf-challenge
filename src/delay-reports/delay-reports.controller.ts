import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DelayReportsService } from './delay-reports.service';
import { CreateDelayReportDto } from './dto/create-delay-report.dto';
import { UpdateDelayReportDto } from './dto/update-delay-report.dto';

@Controller('delay-reports')
export class DelayReportsController {
  constructor(private readonly delayReportsService: DelayReportsService) {}

  @Post()
  create(@Body() createDelayReportDto: CreateDelayReportDto) {
    return this.delayReportsService.create(createDelayReportDto);
  }

  @Get()
  findAll() {
    return this.delayReportsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.delayReportsService.findOne({id:+id});
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDelayReportDto: UpdateDelayReportDto) {
    return this.delayReportsService.update({id:+id}, updateDelayReportDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.delayReportsService.remove(+id);
  }
}
