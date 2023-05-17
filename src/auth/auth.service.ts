import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/SignIn.dto';
import { CreateUserDto } from './dto/CreateUserDto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
      ) {} 
      
      async signUp(createUserDto:CreateUserDto){
        const salt = await bcrypt.genSalt();
        createUserDto.password = await bcrypt.hash(createUserDto.password,salt);
        return this.usersService.create({...createUserDto,salt});
      }
      async signIn(signInDto:SignInDto) {
        const user = await this.usersService.findOne({username:signInDto.username});
        if(!user){
          throw new NotFoundException(`user ${user} was not found`);
        }
        if (user?.password !== await bcrypt.hash(signInDto.password,user.salt)) {
          throw new UnauthorizedException();
        }
        const payload = { username: user.username, sub: user.id };
        return {
          access_token: await this.jwtService.signAsync(payload),
        };
      }
  }