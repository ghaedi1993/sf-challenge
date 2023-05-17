import { Injectable } from '@nestjs/common';
import { User } from './user.model';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async create(user: Partial<User>) {
    return this.usersRepository.create(user);
  }
  async findAll(): Promise<User[]> {
    return this.usersRepository.findAll();
  }

  findOne(where: Partial<User>): Promise<User> {
    return this.usersRepository.findOne(where);
  }
}
