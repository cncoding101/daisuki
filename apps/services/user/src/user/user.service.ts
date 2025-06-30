import { status } from '@grpc/grpc-js';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import * as argon from 'argon2';
import { plainToInstance } from 'class-transformer';
import { UserRequestDto, UserResponseDto } from './dto';
import { SigninRequestDto } from './dto/sign-in.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable({})
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(dto: UserRequestDto) {
    try {
      const hashedPassword = await argon.hash(dto.password);

      const user = await this.prisma.user.create({
        data: {
          ...dto,
          password: hashedPassword,
        },
      });

      return plainToInstance(UserResponseDto, user);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new RpcException({ code: status.INVALID_ARGUMENT, message: 'Credentials taken' });
        }
      }

      throw error;
    }
  }

  async signIn(dto: SigninRequestDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (user == null) throw new RpcException({ code: status.PERMISSION_DENIED, message: 'Incorrect credentials' });

    const verifyPassword = await argon.verify(user.password, dto.password);
    if (!verifyPassword) throw new RpcException({ code: status.PERMISSION_DENIED, message: 'Incorrect credentials' });

    return plainToInstance(UserResponseDto, user);
  }
}
