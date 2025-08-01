import { Body, Controller, Get, Post, UseGuards,Req, } from '@nestjs/common';
import { CreateUserDto } from './create-user-dto';
import { UserService } from './user.service';
import { LoginDto } from './login-dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('users')
export class UsersController {

  constructor(private userService:UserService){}


  @UseGuards(JwtAuthGuard)
  @Get('/profile')

  async getProfile(@Req() req){
    return req.user
  }

  @Post('/signup')
  
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.signup(createUserDto);
  }

  @Post('/login')

  async login(@Body() loginDto:LoginDto ){
    return await this.userService.login(loginDto)
  }
}
