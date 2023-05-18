import { IsEmail, IsEnum } from 'class-validator';
import { UserRole } from '../user.model';

export class CreateUserDto {
  @IsEmail()
  username: string;

  @IsEnum(UserRole)
  role: UserRole;
}
