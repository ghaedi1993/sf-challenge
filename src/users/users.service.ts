import { Injectable, UseGuards } from '@nestjs/common';
import { User } from './user.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}
  async create(user:Partial<User>){
    return this.userModel.create({...user});  
  }
  async findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }

  findOne(where: Partial<User>): Promise<User> {
    return this.userModel.findOne({
      where: {
        ...where
      },
    });
  }
  }