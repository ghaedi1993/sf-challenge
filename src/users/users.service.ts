import { Injectable } from '@nestjs/common';
import { User } from './user.model';
import { UsersRepository } from './users.repository';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto) {
    return this.usersRepository.create(createUserDto);
  }
  async findAll(where: Partial<User> = {}, options = {}): Promise<User[]> {
    return this.usersRepository.findAll(where, options);
  }

  async findOne(where: Partial<User>, options = {}): Promise<User> {
    return this.usersRepository.findOne(where, options);
  }

  update(
    where: Partial<User>,
    updateUserDto: UpdateUserDto,
  ): Promise<[number, User[]]> {
    return this.usersRepository.update(where, updateUserDto);
  }
}
