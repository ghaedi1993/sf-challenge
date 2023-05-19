import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { FindOptions } from 'sequelize';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.userModel.create({ ...createUserDto });
  }

  async findAll(
    where: Partial<User>,
    options: FindOptions = {},
  ): Promise<User[]> {
    const { include, order } = options;
    return this.userModel.findAll({
      where: {
        ...where,
      },
      include,
      order,
    });
  }

  async findOne(
    where: Partial<User>,
    options: FindOptions = {},
  ): Promise<User> {
    const { include, order } = options;
    return this.userModel.findOne({
      where: {
        ...where,
      },
      include,
      order,
    });
  }

  async update(
    where: Partial<User>,
    updateUserDto: UpdateUserDto,
  ): Promise<[number, User[]]> {
    return this.userModel.update(updateUserDto, {
      where: { ...where },
      returning: true,
    });
  }
}
