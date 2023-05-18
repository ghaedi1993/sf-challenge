import { BadRequestException, ConflictException, Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreateLateDeliveryDto } from './dto/create-late-delivery.dto';
import { UpdateLateDeliveryDto } from './dto/update-late-delivery.dto';
import { LATE_DELIVERY_STATUS, LateDelivery } from './late-delivery.model';
import { LateDeliveriesRepository } from './late-deliveries.repository';
import { OrdersService } from 'src/orders/orders.service';
import { UsersService } from 'src/users/users.service';
import { UserRole } from 'src/users/user.model';

@Injectable()
export class LateDeliveriesService {
  constructor(private lateDeliveriesRepository: LateDeliveriesRepository
    ,
    @Inject(forwardRef(() => OrdersService))
    private ordersService: OrdersService,
    private usersService: UsersService
    ) {}

  async create(createLateDeliveryDto: CreateLateDeliveryDto) {
    const {orderId} = createLateDeliveryDto; 
    const order = await this.ordersService.findOne({id:orderId},{include:[LateDelivery]})
    if(!order){
      throw new BadRequestException('Provide a Valid Order');
    }
    if(await this.ordersService.isNotLate(orderId)){
        throw new BadRequestException('Order is not late!');
    }
    // we should make sure the late delivery is for a valid order , not before deliver_time and not already in process
    if(await this.ordersService.hasLateDelivery(orderId)) {
      throw new BadRequestException('This Order has a Late Delivery in Process')
    }
    return this.lateDeliveriesRepository.create(createLateDeliveryDto);
  }
  async findAll(
    where: Partial<LateDelivery> = {},
    options = {},
  ): Promise<LateDelivery[]> {
    return this.lateDeliveriesRepository.findAll(where, options);
  }

  async findOne(
    where: Partial<LateDelivery>,
    options = {},
  ): Promise<LateDelivery> {
    return this.lateDeliveriesRepository.findOne(where, options);
  }
  async fetchFromQueue(agentId:number){
    const agent = await this.usersService.findOne({id:agentId},{include:[LateDelivery]}); 
    const alreadyPickedOne = agent.lateDeliveries.some(lateDelivery=>lateDelivery.status !== LATE_DELIVERY_STATUS.PICKED)
    // make sure user is an agent and doesn't have a late delivery on hand
    if(!agent || agent.role !== UserRole.AGENT) {
      throw new BadRequestException('Provide a Valid Agent');
    }
    if(alreadyPickedOne){
      throw new ConflictException('Already have a Late Deliver')
    }
    // only get those with waiting status and null agentId
    const firstInQueue = await this.findOne({
    status:LATE_DELIVERY_STATUS.WAITING,
    agentId:null
    },{
      order: [['createdAt','ASC']]
    })
    await this.update({id:firstInQueue.id},{status:LATE_DELIVERY_STATUS.PICKED,agentId});

    return firstInQueue;
  }
  async fullfil(id:number){
    return this.update({id,status:LATE_DELIVERY_STATUS.PICKED},{status:LATE_DELIVERY_STATUS.DONE});
  }
  update(
    where: Partial<LateDelivery>,
    updateLateDeliveryDto: UpdateLateDeliveryDto,
  ): Promise<[number, LateDelivery[]]> {
    return this.lateDeliveriesRepository.update(where, updateLateDeliveryDto);
  }
  async remove(id: number): Promise<number> {
    return this.lateDeliveriesRepository.delete(id);
  }
}
