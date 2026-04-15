import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Roles } from 'src/auth/decorators/role.decorators';

@ApiTags('Bookings')
@ApiBearerAuth('access-token')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Roles('USER')
  @Post()
  @ApiOperation({ summary: 'Buat booking kos baru' })
  @ApiBody({ type: CreateBookDto })
  @ApiCreatedResponse({ description: 'Booking berhasil dibuat.' })
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @Roles('USER')
  @Get()
  @ApiOperation({ summary: 'Ambil semua data booking' })
  @ApiOkResponse({ description: 'Daftar booking berhasil diambil.' })
  findAll() {
    return this.booksService.findAll();
  }

  @Roles('USER')
  @Get(':id')
  @ApiOperation({ summary: 'Ambil detail booking berdasarkan ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID booking' })
  @ApiOkResponse({ description: 'Detail booking berhasil diambil.' })
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(+id);
  }

  @Roles('USER')
  @Patch(':id')
  @ApiOperation({ summary: 'Perbarui data booking berdasarkan ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID booking' })
  @ApiBody({ type: UpdateBookDto })
  @ApiOkResponse({ description: 'Booking berhasil diperbarui.' })
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(+id, updateBookDto);
  }

  @Roles('USER')
  @Delete(':id')
  @ApiOperation({ summary: 'Hapus data booking berdasarkan ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID booking' })
  @ApiOkResponse({ description: 'Booking berhasil dihapus.' })
  remove(@Param('id') id: string) {
    return this.booksService.remove(+id);
  }
}
