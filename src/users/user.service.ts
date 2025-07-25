import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './create-user-dto';
import { SignUpResponse } from './user.interface';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {

    constructor(private readonly prisma: PrismaService) {}

    async signup(payload:CreateUserDto): Promise<SignUpResponse> {
      const hash = await this.encryptPassword(payload.password, 10)

      payload.password = hash

      return await this.prisma.user.create({
        data:payload,
        select:{
            email:true,
            id:true
        }
      })
    }

    async encryptPassword(plainText, saltRounds) {
        return await bcrypt.hash(plainText,saltRounds)
    }
}
