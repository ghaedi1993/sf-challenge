import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersRepository } from './users.repository';
import { UsersController } from './users.controller';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersService],
})
export class UsersModule {}
