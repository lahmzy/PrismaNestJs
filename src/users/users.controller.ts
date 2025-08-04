import { Body, Controller, Get, Post, UseGuards,Req, } from '@nestjs/common';
import { CreateUserDto } from './create-user-dto';
import { UserService } from './user.service';
import { LoginDto } from './login-dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Role } from 'src/roles/roles.enum';
import { Roles } from 'src/roles/roles.decorator';
import { RolesGuard } from 'src/roles/roles.guard';


@Controller('users')
export class UsersController {

  constructor(private userService:UserService){}


  @Roles([Role.ADMIN,Role.USER])
  @UseGuards(JwtAuthGuard,RolesGuard)
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
