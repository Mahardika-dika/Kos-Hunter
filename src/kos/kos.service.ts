import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateKoDto } from './dto/create-ko.dto';
import { UpdateKoDto } from './dto/update-ko.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { AiService } from 'src/ai/ai.service';
import { Prisma } from 'generated/prisma/client';
import { prismaErrors } from 'src/common/utils/prisma_errors.utils';

@Injectable()
export class KosService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly AI: AiService,
  ) {}

  async create(
    user_id: number,
    createKoDto: CreateKoDto,
    file: Express.Multer.File,
  ) {
    const description: string = createKoDto.ai
      ? await this.AI.generateDescription({
          name: createKoDto.name,
          location: createKoDto.address,
          price: createKoDto.price_per_month,
          facilities: createKoDto.fasility,
          gender: createKoDto.gender,
        })
      : createKoDto.description;

    try {
      const add = await this.prisma.kos.create({
        data: {
          user_id,
          name: createKoDto.name,
          address: createKoDto.address,
          price_per_month: createKoDto.price_per_month,
          gender: createKoDto.gender,
          description: description,
          kosFasilities: { create: { fasility: createKoDto.fasility } },
          kosImages: { create: { file: file.filename } },
        },
        select: {
          id: true,
          name: true,
          address: true,
          price_per_month: true,
          gender: true,
          description: true,
          kosFasilities: { select: { id: true, fasility: true } },
          kosImages: { select: { id: true, file: true } },
          user: { select: { name: true, email: true, phone: true } },
        },
      });

      if (!add) {
        throw new HttpException(
          {
            message: 'Failed creating kos data!, try again later',
            success: false,
            data: null,
            error: 'FAILED_CREATING_DATA',
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      return {
        details: {
          id: add.id,
          name: add.name,
          address: add.address,
          price_per_month: add.price_per_month,
          gender: add.gender,
          description: add.description,
        },
        facilities: {
          id: add.kosFasilities?.id,
          fasility: add.kosFasilities?.fasility,
        },
        file: {
          id: add.kosImages.map((x) => {
            return x.id;
          }),
          file: add.kosImages.map((x) => {
            return x.file;
          }),
        },
      };
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
      const find = await this.prisma.kos.findMany({
        select: {
          id: true,
          name: true,
          address: true,
          price_per_month: true,
          gender: true,
          description: true,
          kosFasilities: { select: { id: true, fasility: true } },
          kosImages: { select: { id: true, file: true } },
          user: { select: { name: true, email: true, phone: true } },
        },
      });

      if (!find || find.length === 0) {
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
      const find = await this.prisma.kos.findFirst({
        where: { id },
        select: {
          id: true,
          name: true,
          address: true,
          price_per_month: true,
          gender: true,
          description: true,
          kosFasilities: { select: { id: true, fasility: true } },
          kosImages: { select: { id: true, file: true } },
          user: { select: { name: true, email: true, phone: true } },
        },
      });

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

  async update(
    id: number,
    updateKoDto: UpdateKoDto,
    file: Express.Multer.File,
  ) {
    const description: string = updateKoDto.ai
      ? await this.AI.generateDescription({
          name: updateKoDto.name,
          location: updateKoDto.address,
          price: updateKoDto.price_per_month,
          facilities: updateKoDto.fasility,
          gender: updateKoDto.gender,
        })
      : updateKoDto.description;

    try {
      const updt = await this.prisma.kos.update({
        where: { id },
        data: {
          id,
          name: updateKoDto.name,
          address: updateKoDto.address,
          price_per_month: updateKoDto.price_per_month,
          gender: updateKoDto.gender,
          description: description,
          kosFasilities: { update: { fasility: updateKoDto.fasility } },
          kosImages: {
            update: { where: { kos_id: id }, data: { file: file.filename } },
          },
        },
        select: {
          id: true,
          name: true,
          address: true,
          price_per_month: true,
          gender: true,
          description: true,
          kosFasilities: { select: { id: true, fasility: true } },
          kosImages: { select: { id: true, file: true } },
          user: { select: { name: true, email: true, phone: true } },
        },
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
      const delt = await this.prisma.kos.delete({ where: { id } });

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

      return 'Kos successfully deleted!';
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
