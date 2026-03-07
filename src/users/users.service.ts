import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { BcryptService } from 'src/bcrypt/bcrypt.service';
import { Prisma } from '@prisma/client';
import { SpecificQuerry } from './dto/specific-querry.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly bcrypt: BcryptService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const comparePassword = await this.bcrypt.hashPassword(
      createUserDto.password,
    );
    try {
      const create = await this.prisma.users.create({
        data: { ...createUserDto, password: comparePassword },
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
      const userSafe = {
        id: create.id,
        name: create.name,
        email: create.email,
        ...(create.phone && { phone: create.phone }),
        ...(create.role && { role: create.role }),
      };

      return userSafe;
    } catch (error) {
      if (error instanceof HttpException) {
        return error;
      }
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        switch (error.code) {
          case 'P2002':
            throw new HttpException(
              {
                message: 'E-mail is already used!, use another',
                success: false,
                data: null,
                error: 'DATA_CONFLICT',
              },
              HttpStatus.CONFLICT,
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
                message: 'Database error!, try again later',
                success: false,
                data: null,
                error: 'DATABSE_ERROR',
              },
              HttpStatus.BAD_REQUEST,
            );
        }
      }
      console.log(error);
    }
  }

  async findAll() {
    try {
      const find = await this.prisma.users.findMany({});

      if (!find) {
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
      if (find.length === 0) {
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

      return find.map((x) => {
        return {
          id: x.id,
          name: x.name,
          email: x.email,
          ...(x.phone && { phone: x.phone }),
          ...(x.role && { role: x.role }),
        };
      });
    } catch (error) {
      if (error instanceof HttpException) {
        return error;
      }
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        switch (error.code) {
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

  async findOne(querry: SpecificQuerry) {
    try {
      const where: Prisma.UsersWhereInput = {};

      if (querry.id) {
        where.id = Number(querry.id);
      }
      if (querry.name) {
        where.name = {
          contains: querry.name,
          mode: 'insensitive',
        };
      }
      if (querry.email) {
        where.email = {
          contains: querry.email,
          mode: 'insensitive',
        };
      }

      const findSpecific = await this.prisma.users.findMany({ where });

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
      if (findSpecific.length === 0) {
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
      return findSpecific.map((x) => {
        return {
          id: x.id,
          name: x.name,
          email: x.email,
          ...(x.phone && { phone: x.phone }),
          ...(x.role && { role: x.role }),
        };
      });
    } catch (error) {
      console.log(error);
      if (error instanceof HttpException) {
        return error;
      }
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        switch (error.code) {
          case 'P2001':
            throw new HttpException(
              {
                message: 'Failed to showing data!',
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
              { message: 'Database Error!, try again later' },
              HttpStatus.BAD_REQUEST,
            );
        }
      }
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const updt = await this.prisma.users.update({
        where: { id },
        data: updateUserDto,
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

      const find = await this.prisma.users.findMany({ where: { id } });

      if (!find) {
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
      if (find.length === 0) {
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

      return find.map((x) => {
        return {
          id: x.id,
          name: x.name,
          email: x.email,
          ...(x.phone && { phone: x.phone }),
          ...(x.role && { role: x.role }),
        };
      });
    } catch (error) {
      if (error instanceof HttpException) {
        return error;
      }
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        switch (error.code) {
          case 'P2001':
            throw new HttpException(
              {
                message: 'Data not found!, try another one',
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
          case 'P2002 ':
            throw new HttpException(
              {
                message: 'E - Mail has been used!, try another one',
                success: false,
                data: null,
                error: 'DATA_CONFLICT',
              },
              HttpStatus.CONFLICT,
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
        return error;
      }
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        switch (error.code) {
          case 'P2025':
            throw new HttpException(
              {
                message: 'Data record not found!',
                success: false,
                data: null,
                error: 'NOT_FOUND',
              },
              HttpStatus.NOT_FOUND,
            );
          case 'P2001':
            throw new HttpException(
              {
                message: "Can't found that data! try again later",
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
