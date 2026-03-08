import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateKoDto } from './dto/create-ko.dto';
// import { UpdateKoDto } from './dto/update-ko.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { AiService } from 'src/ai/ai.service';

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

      const addFacilitiesAndFile = await this.prisma.$transaction([
        this.prisma.kosFasilities.create({
          data: { kos_id: add.id, fasility: createKoDto.fasility },
        }),

        this.prisma.kosImage.create({
          data: { kos_id: add.id, file: file.filename },
        }),
      ]);

      if (!addFacilitiesAndFile) {
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
        add,
        addFacilitiesAndFile,
      };
    } catch (error) {
      console.log(error);
    }
  }

  // async findAll() {
  //   return `This action returns all kos`;
  // }

  // async findOne(id: number) {
  //   return `This action returns a #${id} ko`;
  // }

  // async update(id: number, updateKoDto: UpdateKoDto) {
  //   return `This action updates a #${id} ko`;
  // }

  // async remove(id: number) {
  //   return `This action removes a #${id} ko`;
  // }
}
