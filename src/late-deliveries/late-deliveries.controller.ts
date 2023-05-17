import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LateDeliveriesService } from './late-deliveries.service';
import { CreateLateDeliveryDto } from './dto/create-late-delivery.dto';
import { UpdateLateDeliveryDto } from './dto/update-late-delivery.dto';

@Controller('late-deliveries')
export class LateDeliveriesController {
  constructor(private readonly lateDeliveriesService: LateDeliveriesService) {}

  @Post()
  create(@Body() createLateDeliveryDto: CreateLateDeliveryDto) {
    return this.lateDeliveriesService.create(createLateDeliveryDto);
  }

  @Get()
  findAll() {
    return this.lateDeliveriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lateDeliveriesService.findOne({id:+id});
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLateDeliveryDto: UpdateLateDeliveryDto) {
    return this.lateDeliveriesService.update({id:+id}, updateLateDeliveryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lateDeliveriesService.remove(+id);
  }
}
