import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Prisma } from 'generated/prisma/client';
import { prismaErrors } from 'src/common/utils/prisma_errors.utils';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class ReviewsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createReviewDto: CreateReviewDto) {
    try {
      const add = await this.prisma.reviews.create({
        data: { ...createReviewDto },
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
      const find = await this.prisma.reviews.findMany({});

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
      const find = await this.prisma.reviews.findFirst({ where: { id } });

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

  async update(id: number, updateReviewDto: UpdateReviewDto) {
    try {
      const updt = await this.prisma.reviews.update({
        where: { id },
        data: { ...updateReviewDto },
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
      const dlt = await this.prisma.reviews.delete({ where: { id } });

      if (!dlt) {
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

      return dlt;
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
