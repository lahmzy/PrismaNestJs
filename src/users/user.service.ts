import { ConflictException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './create-user-dto';
import { SignUpResponse } from './user.interface';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

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

    console.log(payload.password);

    payload.password = hash;

    return await this.prisma.user.create({
      data: payload,
      select: {
        email: true,
        id: true,
      },
    });
  }

  async encryptPassword(plainText, saltRounds) {
    return await bcrypt.hash(plainText, saltRounds);
  }
}
