import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthenticationDto } from './dto/authentication.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { BcryptService } from 'src/common/bcrypt/bcrypt.service';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from 'generated/prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly bcrypt: BcryptService,
    private readonly jwt: JwtService,
  ) {}
  async auth(authenticationDto: AuthenticationDto) {
    try {
      const find = await this.prisma.users.findUnique({
        where: { email: authenticationDto.email },
      });

      if (!find) {
        throw new HttpException(
          {
            message: 'Invalid credentials',
            success: false,
            data: null,
            error: 'UNAUTHORIZED',
          },
          HttpStatus.UNAUTHORIZED,
        );
      }

      const checkPassword = await this.bcrypt.comparePassword(
        authenticationDto.password,
        find.password,
      );

      if (!checkPassword) {
        throw new HttpException(
          {
            message: 'Invalid credentials',
            success: false,
            data: null,
            error: 'UNAUTHORIZED',
          },
          HttpStatus.UNAUTHORIZED,
        );
      }

      const Payload = {
        id: find.id,
        name: find.name,
        email: find.email,
        role: find.phone,
      };
      const token = await this.jwt.signAsync(Payload);

      if (!token || token === undefined) {
        throw new HttpException(
          {
            message: 'Failed to generate authentication token',
            success: false,
            data: null,
            error: 'TOKEN_FAILED',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      return {
        id: Payload.id,
        name: Payload.name,
        email: Payload.email,
        ...(Payload.role && { role: Payload.role }),
        token,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        switch (error.code) {
          case 'P2001':
            throw new HttpException(
              {
                message: "Can't found that data!, try again later",
                success: false,
                data: null,
                error: 'NOT_FOUND',
              },
              HttpStatus.NOT_FOUND,
            );
          case 'P2024':
            throw new HttpException(
              {
                message: 'Connection pool timeout',
                success: false,
                data: null,
                error: 'CONNECTION_TIMEOUT',
              },
              HttpStatus.GATEWAY_TIMEOUT,
            );

          default:
            throw new HttpException(
              {
                message: 'Database Error!, try again later',
                success: false,
                data: null,
                error: 'DATABASE_ERROR',
              },
              HttpStatus.BAD_REQUEST,
            );
        }
      }
      console.log(error);
    }
  }
}
