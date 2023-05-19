import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { CreateDelayReportDto } from './dto/create-delay-report.dto';
import { UpdateDelayReportDto } from './dto/update-delay-report.dto';
import { DelayReportsRepository } from './delay-reports.repository';
import { DelayReport } from './delay-report.model';
import { OrdersService } from 'src/orders/orders.service';
import { LateDeliveriesService } from 'src/late-deliveries/late-deliveries.service';
import { Trip, TripStatus } from 'src/trips/trip.model';
import { LateDelivery } from 'src/late-deliveries/late-delivery.model';

@Injectable()
export class DelayReportsService {
  constructor(
    private delayreportsRepository: DelayReportsRepository,
    private ordersService: OrdersService,
    private lateDeliveriesService: LateDeliveriesService,
  ) {}

  async create(createDelayReportDto: CreateDelayReportDto) {
    const { orderId } = createDelayReportDto;
    if(!orderId){
      throw new BadRequestException("Provide orderId")
    }
    const order = await this.ordersService.findOne(
      { id: orderId },
      { include: [Trip, DelayReport, LateDelivery] },
    );
    if (order?.trip?.status === TripStatus.DELIVERED) {
      throw new ConflictException('This order is already Delivered');
    }
    if (await this.ordersService.isLate(orderId)) {
      if (['ASSIGNED', 'AT_VENDOR', 'PICKED'].includes(order.trip.status)) {
        this.ordersService.udpdateEta(orderId).catch((err) => console.log(err));
      } else {
        this.lateDeliveriesService
          .create({ orderId })
          .catch((err) => console.log(err));
      }
    }
    return this.delayreportsRepository.create({ orderId });
  }
  async findAll(
    where: Partial<DelayReport> = {},
    options = {},
  ): Promise<DelayReport[]> {
    return this.delayreportsRepository.findAll(where, options);
  }

  async findOne(
    where: Partial<DelayReport>,
    options = {},
  ): Promise<DelayReport> {
    return this.delayreportsRepository.findOne(where, options);
  }

  async update(
    where: Partial<DelayReport>,
    updateDelayReportDto: UpdateDelayReportDto,
  ): Promise<[number, DelayReport[]]> {
    return this.delayreportsRepository.update(where, updateDelayReportDto);
  }
}
