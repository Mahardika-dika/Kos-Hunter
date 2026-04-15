import {
  Controller,
  Get,
  Post,
  Body,
  UploadedFile,
  UseInterceptors,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { KosService } from './kos.service';
import { CreateKoDto } from './dto/create-ko.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from 'src/common/config/multer.config';
import { UpdateKoDto } from './dto/update-ko.dto';
import { Roles } from 'src/auth/decorators/role.decorators';

@ApiTags('Kos')
@ApiBearerAuth('access-token')
@Controller('kos')
export class KosController {
  constructor(private readonly kosService: KosService) {}

  @Roles()
  @Post('addKos/:user_id')
  @UseInterceptors(FileInterceptor('file', multerConfig))
  @ApiOperation({ summary: 'Tambah data kos baru milik user' })
  @ApiParam({ name: 'user_id', type: Number, description: 'ID pemilik kos' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Data kos dengan upload 1 file gambar.',
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'Kos Melati' },
        address: { type: 'string', example: 'Jl. Mawar No.10, Bandung' },
        price_per_month: { type: 'number', example: 1200000 },
        gender: { type: 'string', enum: ['MALE', 'FEMALE', 'MIXED'] },
        description: { type: 'string', example: 'Kos nyaman dekat kampus.' },
        fasility: {
          type: 'array',
          items: { type: 'string' },
          example: ['WiFi', 'Laundry', 'Dapur'],
        },
        ai: { type: 'boolean', example: true },
        file: { type: 'string', format: 'binary' },
      },
      required: [
        'name',
        'address',
        'price_per_month',
        'gender',
        'fasility',
        'ai',
      ],
    },
  })
  @ApiCreatedResponse({ description: 'Kos berhasil ditambahkan.' })
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createKoDto: CreateKoDto,
    @Param('user_id') user_id: string,
  ) {
    return await this.kosService.create(+user_id, createKoDto, file);
  }

  @Roles()
  @Get()
  @ApiOperation({ summary: 'Ambil semua data kos' })
  @ApiOkResponse({ description: 'Daftar kos berhasil diambil.' })
  async findAll() {
    return await this.kosService.findAll();
  }

  @Roles()
  @Get(':id')
  @ApiOperation({ summary: 'Ambil detail kos berdasarkan ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID kos' })
  @ApiOkResponse({ description: 'Detail kos berhasil diambil.' })
  async findOne(@Param('id') id: string) {
    return await this.kosService.findOne(+id);
  }

  @Roles()
  @Patch(':id')
  @UseInterceptors(FileInterceptor('file', multerConfig))
  @ApiOperation({ summary: 'Perbarui data kos berdasarkan ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID kos' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Update data kos (semua field opsional) + upload ulang file.',
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        address: { type: 'string' },
        price_per_month: { type: 'number' },
        gender: { type: 'string', enum: ['MALE', 'FEMALE', 'MIXED'] },
        description: { type: 'string' },
        fasility: { type: 'array', items: { type: 'string' } },
        ai: { type: 'boolean' },
        file: { type: 'string', format: 'binary' },
      },
    },
  })
  @ApiOkResponse({ description: 'Kos berhasil diperbarui.' })
  async update(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() updateKoDto: UpdateKoDto,
  ) {
    return await this.kosService.update(+id, updateKoDto, file);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Hapus data kos berdasarkan ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID kos' })
  @ApiOkResponse({ description: 'Kos berhasil dihapus.' })
  async remove(@Param('id') id: string) {
    return await this.kosService.remove(+id);
  }
}
