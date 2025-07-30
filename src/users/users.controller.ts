import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './create-user-dto';
import { UserService } from './user.service';
import { LoginDto } from './login-dto';

@Controller('users')
export class UsersController {

  constructor(private userService:UserService){}

  @Post('/signup')
  
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.signup(createUserDto);
  }

  @Post('/login')

  async login(@Body() loginDto:LoginDto ){
    return await this.userService.login(loginDto)
  }
}
