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
import { KosService } from './kos.service';
import { CreateKoDto } from './dto/create-ko.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from 'src/common/config/multer.config';
import { UpdateKoDto } from './dto/update-ko.dto';
import { Roles } from 'src/auth/decorators/role.decorators';

@Controller('kos')
export class KosController {
  constructor(private readonly kosService: KosService) {}

  @Roles()
  @Post('addKos/:user_id')
  @UseInterceptors(FileInterceptor('file', multerConfig))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createKoDto: CreateKoDto,
    @Param('user_id') user_id: string,
  ) {
    return await this.kosService.create(+user_id, createKoDto, file);
  }

  @Roles()
  @Get()
  async findAll() {
    return await this.kosService.findAll();
  }

  @Roles()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.kosService.findOne(+id);
  }

  @Roles()
  @Patch(':id')
  @UseInterceptors(FileInterceptor('file', multerConfig))
  async update(
    @Param('user_id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() updateKoDto: UpdateKoDto,
  ) {
    return await this.kosService.update(+id, updateKoDto, file);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.kosService.remove(+id);
  }
}
