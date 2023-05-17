import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async create(user: Partial<User>): Promise<User> {
    return this.userModel.create({ ...user });
  }

  async findAll(where: Partial<User> = {}): Promise<User[]> {
    return this.userModel.findAll({
      where: {
        ...where,
      },
    });
  }

  async findOne(where: Partial<User>): Promise<User> {
    return this.userModel.findOne({
      where: {
        ...where,
      },
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

  async delete(id: number): Promise<number> {
    return this.userModel.destroy({ where: { id } });
  }
}
