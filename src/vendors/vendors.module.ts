import { Module } from '@nestjs/common';
import { VendorsService } from './vendors.service';
import { Vendor } from './vendor.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { VendorsController } from './vendors.controller';
import { VendorsRepository } from './vendors.repository';

@Module({
  imports: [SequelizeModule.forFeature([Vendor])],
  providers: [VendorsService, VendorsRepository],
  exports: [VendorsService],
  controllers: [VendorsController],
})
export class VendorsModule {}
