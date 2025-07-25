import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './create-user-dto';

@Controller('users')
export class UsersController {
  @Post('/signup')
  create(@Body() createUserDto: CreateUserDto) {
    return createUserDto;
  }
}
