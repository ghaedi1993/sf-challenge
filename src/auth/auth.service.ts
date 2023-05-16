import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './signin.dto';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
      ) {}    
      async signIn(signInDto:SignInDto) {
        const user = await this.usersService.findOne(signInDto.username);
        if(!user){
          throw new NotFoundException(`user ${user} was not found`);
        }
        if (user?.password !== signInDto.password) {
          throw new UnauthorizedException();
        }
        const payload = { username: user.username, sub: user.id };
        return {
          access_token: await this.jwtService.signAsync(payload),
        };
      }
  }