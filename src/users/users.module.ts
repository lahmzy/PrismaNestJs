import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UserService } from './user.service';
import { PrismaService } from 'src/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Module({
   imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [UsersController],
  providers:[UserService, PrismaService]
})
export class UsersModule {}
