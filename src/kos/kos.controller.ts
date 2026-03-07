import {
  Controller,
  // Get,
  Post,
  Body,
  UploadedFile,
  Param,
  UseInterceptors,
  // Patch,
  // Param,
  // Delete,
} from '@nestjs/common';
import { KosService } from './kos.service';
import { CreateKoDto } from './dto/create-ko.dto';
import { Public } from 'src/auth/decorators/public.decorators';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from 'src/common/config/multer.config';
// import { UpdateKoDto } from './dto/update-ko.dto';

@Controller('kos')
export class KosController {
  constructor(private readonly kosService: KosService) {}

  @Public()
  @Post('addKos/:user_id')
  @UseInterceptors(FileInterceptor('file', multerConfig))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createKoDto: CreateKoDto,
    @Param('user_id') user_id: string,
  ) {
    return await this.kosService.create(+user_id, createKoDto, file);
  }

  // @Get()
  // async findAll() {
  //   return await this.kosService.findAll();
  // }

  // @Get(':id')
  // async findOne(@Param('id') id: string) {
  //   return await this.kosService.findOne(+id);
  // }

  // @Patch(':id')
  // async update(@Param('id') id: string, @Body() updateKoDto: UpdateKoDto) {
  //   return await this.kosService.update(+id, updateKoDto);
  // }

  // @Delete(':id')
  // async remove(@Param('id') id: string) {
  //   return await this.kosService.remove(+id);
  // }
}
