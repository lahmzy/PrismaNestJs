import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './create-user-dto';
import { UserService } from './user.service';

@Controller('users')
export class UsersController {

  constructor(private userService:UserService){}

  @Post('/signup')
  
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.signup(createUserDto);
  }
}
