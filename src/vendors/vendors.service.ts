import { Injectable } from '@nestjs/common';
import { Vendor } from './vendor.model';
import { VendorsRepository } from './vendors.repository';
import { UpdateVendorDto } from './dto/update-vendor.dto';

@Injectable()
export class VendorsService {
  constructor(private vendorsRepository: VendorsRepository) {}

  async create(vendor: Partial<Vendor>) {
    return this.vendorsRepository.create(vendor);
  }
  async findAll(where: Partial<Vendor> = {}): Promise<Vendor[]> {
    return this.vendorsRepository.findAll(where);
  }
  findOne(where: Partial<Vendor>): Promise<Vendor> {
    return this.vendorsRepository.findOne(where);
  }
  update(
    where: Partial<Vendor>,
    updateVendorDto: UpdateVendorDto,
  ): Promise<[number, Vendor[]]> {
    return this.vendorsRepository.update(where, updateVendorDto);
  }
}
