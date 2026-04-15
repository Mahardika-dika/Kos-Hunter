import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { Prisma } from 'generated/prisma/client';
import { prismaErrors } from 'src/common/utils/prisma_errors.utils';

@Injectable()
export class BooksService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createBookDto: CreateBookDto) {
    try {
      const add = await this.prisma.books.create({
        data: { ...createBookDto },
      });

      if (!add) {
        throw new HttpException(
          {
            message: 'Failed creating kos data!, try again later',
            success: false,
            data: null,
            error: 'FAILED_CREATING_DATA',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      return add;
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
      const find = await this.prisma.books.findMany({});

      if (!find) {
        throw new HttpException(
          {
            message: 'Failed creating kos data!, try again later',
            success: false,
            data: null,
            error: 'FAILED_CREATING_DATA',
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

  async findOne(id: number) {
    try {
      const find = await this.prisma.books.findFirst({ where: { id } });

      if (!find) {
        throw new HttpException(
          {
            message: 'Failed creating kos data!, try again later',
            success: false,
            data: null,
            error: 'FAILED_CREATING_DATA',
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

  async update(id: number, updateBookDto: UpdateBookDto) {
    try {
      const updt = await this.prisma.books.update({
        where: { id },
        data: { ...updateBookDto },
      });

      if (!updt) {
        throw new HttpException(
          {
            message: 'Failed creating kos data!, try again later',
            success: false,
            data: null,
            error: 'FAILED_CREATING_DATA',
          },
          HttpStatus.NOT_FOUND,
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
      const delt = await this.prisma.books.delete({ where: { id } });

      if (!delt) {
        throw new HttpException(
          {
            message: 'Failed creating kos data!, try again later',
            success: false,
            data: null,
            error: 'FAILED_CREATING_DATA',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      return 'successfully deleted';
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
