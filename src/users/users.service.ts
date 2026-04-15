import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { BcryptService } from 'src/common/bcrypt/bcrypt.service';
import { SpecificQuerry } from './dto/specific-querry.dto';
import { Prisma } from 'generated/prisma/client';
import { prismaErrors } from 'src/common/utils/prisma_errors.utils';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly bcrypt: BcryptService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const hashPassword = await this.bcrypt.hashPassword(createUserDto.password);

    try {
      if (createUserDto.role === undefined) {
        throw new HttpException(
          {
            message: "You don't have permision",
            success: false,
            data: null,
            error: 'UNAUTHORIZED',
          },
          HttpStatus.UNAUTHORIZED,
        );
      }

      const create = await this.prisma.users.create({
        data: { ...createUserDto, password: hashPassword },
        select: { id: true, name: true, email: true, phone: true, role: true },
      });

      if (!create) {
        throw new HttpException(
          {
            message: "Can't creating users data",
            success: false,
            data: null,
            error: 'FAILED_CREATING_DATA',
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      return create;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw await prismaErrors(error);
      }
      console.log(error);
    }
  }

  async findAll() {
    try {
      const find = await this.prisma.users.findMany({
        select: { id: true, name: true, email: true, phone: true, role: true },
      });

      if (!find || find.length === 0) {
        throw new HttpException(
          {
            message: 'Data is empty!, Nothing to display',
            success: false,
            data: null,
            error: 'NOT_FOUND',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      return find;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw await prismaErrors(error);
      }
      console.log(error);
    }
  }

  async findOne(querry: SpecificQuerry) {
    try {
      const where: Prisma.UsersWhereInput = {};

      if (querry.id) where.id = Number(querry.id);
      if (querry.name)
        where.name = { contains: querry.name, mode: 'insensitive' };
      if (querry.email)
        where.email = { contains: querry.email, mode: 'insensitive' };

      const findSpecific = await this.prisma.users.findFirst({
        where,
        select: { id: true, name: true, email: true, phone: true, role: true },
      });

      if (!findSpecific) {
        throw new HttpException(
          {
            message: 'Failed to showing data!, Try again later',
            success: false,
            data: null,
            error: 'NOT_FOUND',
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      return findSpecific;
    } catch (error) {
      console.log(error);
      if (error instanceof HttpException) {
        throw error;
      }
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw await prismaErrors(error);
      }
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const updt = await this.prisma.users.update({
        where: { id },
        data: updateUserDto,
        select: { id: true, name: true, email: true, phone: true, role: true },
      });

      if (!updt) {
        throw new HttpException(
          {
            message: 'Failed to updating data!, try again later',
            success: false,
            data: null,
            error: 'UPDATE_FAILED',
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      return updt;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw await prismaErrors(error);
      }
      console.log(error);
    }
  }

  async remove(id: number) {
    try {
      const delt = await this.prisma.users.delete({ where: { id } });

      if (!delt) {
        throw new HttpException(
          {
            message: 'Failed to deleting this data!, try again later',
            success: false,
            data: null,
            error: 'DELETE_FAILED',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw await prismaErrors(error);
      }
      console.log(error);
    }
  }
}
