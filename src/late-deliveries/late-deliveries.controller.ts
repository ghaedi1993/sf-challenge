import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { LateDeliveriesService } from './late-deliveries.service';
import { CreateLateDeliveryDto } from './dto/create-late-delivery.dto';

@Controller('late-deliveries')
export class LateDeliveriesController {
  constructor(private readonly lateDeliveriesService: LateDeliveriesService) {}

  @Post()
  create(@Body() createLateDeliveryDto: CreateLateDeliveryDto) {
    return this.lateDeliveriesService.create(createLateDeliveryDto);
  }

  @Get('agents/:agentId/fetch-from-queue')
  fetchFromQueue(@Param('agentId') agentId: number) {
    return this.lateDeliveriesService.fetchFromQueue(+agentId);
  }

  @Get()
  findAll() {
    return this.lateDeliveriesService.findAll();
  }

  @Patch(':id/done')
  fullfil(@Param('id') id: number) {
    return this.lateDeliveriesService.fullfil(+id);
  }
}
