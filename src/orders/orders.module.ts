import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Order } from './order.model';
import { OrdersRepository } from './orders.repository';
import { UsersModule } from 'src/users/users.module';
import { VendorsModule } from 'src/vendors/vendors.module';

@Module({
  imports: [SequelizeModule.forFeature([Order]), UsersModule, VendorsModule],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepository],
  exports: [OrdersService],
})
export class OrdersModule {}
