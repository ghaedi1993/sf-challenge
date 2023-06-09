import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { VendorsService } from './vendors.service';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';

@Controller('vendors')
export class VendorsController {
  constructor(private readonly vendorsService: VendorsService) {}

  @Post()
  create(@Body() createVendorDto: CreateVendorDto) {
    return this.vendorsService.create(createVendorDto);
  }

  @Get('delay-report')
  getDelayReport() {
    return this.vendorsService.delayReport();
  }
  @Get()
  findAll() {
    return this.vendorsService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVendorDto: UpdateVendorDto) {
    return this.vendorsService.update({ id: +id }, updateVendorDto);
  }
}
