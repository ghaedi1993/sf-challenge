
import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Request,
    UseGuards,
    ValidationPipe
  } from '@nestjs/common';
  import { AuthGuard } from './auth.guard';
  import { AuthService } from './auth.service';
  import { SignInDto } from './dto/SignIn.dto';
import { CreateUserDto } from './dto/CreateUserDto';
import { User } from 'src/users/user.model';
  
  @Controller('auth')
  export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/signup')
    signUp(@Body(ValidationPipe) createUserDto: CreateUserDto): Promise<User> {
      return this.authService.signUp(createUserDto);
    }
    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: SignInDto) {
      return this.authService.signIn(signInDto);
    }
  }
  