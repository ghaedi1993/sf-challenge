import { Module, forwardRef } from '@nestjs/common';
import { VendorsService } from './vendors.service';
import { Vendor } from './vendor.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { VendorsController } from './vendors.controller';
import { VendorsRepository } from './vendors.repository';
import { OrdersModule } from 'src/orders/orders.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Vendor]),
    forwardRef(() => OrdersModule),
  ],
  providers: [VendorsService, VendorsRepository],
  controllers: [VendorsController],
  exports: [VendorsService],
})
export class VendorsModule {}
