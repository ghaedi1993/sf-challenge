import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { TripsRepository } from './trips.repository';
import { Trip } from './trip.model';
import { UsersService } from 'src/users/users.service';
import { UserRole } from 'src/users/user.model';
import { OrdersService } from 'src/orders/orders.service';

@Injectable()
export class TripsService {
  constructor(
    private tripsRepository: TripsRepository,
    private usersService: UsersService,
    private ordersService: OrdersService,
  ) {}

  async create(createTripDto: CreateTripDto) {
    const { deliveryDriverId, orderId } = createTripDto;
    // here we should check to make sure deliveryDriverId is of role DELIVERY_DRIVER
    if (deliveryDriverId) {
      const { role } = await this.usersService.findOne({
        id: deliveryDriverId,
      });
      if (role !== UserRole.DELIVERY_DRIVER) {
        throw new BadRequestException('Provide a Valid Delivery Driver');
      }
    }
    // every order can only have one Trip
    const order = await this.ordersService.findOne(
      {
        id: orderId,
      },
      {
        include: [Trip],
      },
    );
    if (!order) {
      throw new BadRequestException('Provide a Valid Order');
    }
    if (order.trip) {
      throw new ConflictException('Order Already has a Trip');
    }
    return this.tripsRepository.create(createTripDto);
  }
  async findAll(where: Partial<Trip> = {}, options = {}): Promise<Trip[]> {
    return this.tripsRepository.findAll(where, options);
  }

  async findOne(where: Partial<Trip>, options = {}): Promise<Trip> {
    return this.tripsRepository.findOne(where, options);
  }

  async update(
    where: Partial<Trip>,
    updateTripDto: UpdateTripDto,
  ): Promise<[number, Trip[]]> {
    return this.tripsRepository.update(where, updateTripDto);
  }
  async remove(id: number): Promise<number> {
    return this.tripsRepository.delete(id);
  }
}
