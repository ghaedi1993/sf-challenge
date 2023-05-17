import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Vendor } from './vendor.model';
import { UpdateVendorDto } from './dto/update-vendor.dto';

@Injectable()
export class VendorsRepository {
  constructor(
    @InjectModel(Vendor)
    private vendorModel: typeof Vendor,
  ) {}

  async create(vendor: Partial<Vendor>): Promise<Vendor> {
    return this.vendorModel.create({ ...vendor });
  }

  async findAll(where: Partial<Vendor>): Promise<Vendor[]> {
    return this.vendorModel.findAll({
      where: {
        ...where,
      },
    });
  }

  async findOne(where): Promise<Vendor> {
    return this.vendorModel.findOne({
      where: {
        ...where,
      },
    });
  }

  async update(
    where: Partial<Vendor>,
    updateVendorDto: UpdateVendorDto,
  ): Promise<[number, Vendor[]]> {
    return this.vendorModel.update(updateVendorDto, {
      where: { ...where },
      returning: true,
    });
  }

  async delete(id: number): Promise<number> {
    return this.vendorModel.destroy({ where: { id } });
  }
}
