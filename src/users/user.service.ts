import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './create-user-dto';
import { LoginDto } from './login-dto';
import { SignUpResponse } from './user.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService, private jwtService: JwtService) {}

  async signup(payload: CreateUserDto): Promise<SignUpResponse> {
    const existingUser = await this.prisma.user.findFirst({
      where: {
        email: payload.email,
      },
    });

    if (existingUser) {
      throw new ConflictException('A user with this email already exists.');
    }

    const hash = await this.encryptPassword(payload.password, 10);


    payload.password = hash;

    return await this.prisma.user.create({
      data: payload,
      select: {
        email: true,
        id: true,
      },
    });
  }

  async login(loginDto: LoginDto) {
    // check if email exists
    const user = await this.prisma.user.findUnique({
      where: { email: loginDto.email },
    });

    // if email not exist return proper exception error
    if (!user) {
      throw new NotFoundException('User with this email does not exist.');
    }

    // match user password with hashed password
    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    // if password not matched send error invalid password
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password.');
    }

    // return json web token (dummy for now)

    const token = await this.jwtService.signAsync(
      {
        email:user.email,
        id:user.id,
        role:user.role
      },
      {
        expiresIn: '1d'
      }
    )

    return {
      message: 'Login successful',
      user: { id: user.id, email: user.email },
      access_Token: token
    };
  }

  async encryptPassword(plainText, saltRounds) {
    return await bcrypt.hash(plainText, saltRounds);
  }
}
