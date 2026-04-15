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
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Public } from 'src/auth/decorators/public.decorators';

@ApiTags('Reviews')
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Public()
  @Post()
  @ApiOperation({ summary: 'Tambah review baru untuk kos' })
  @ApiBody({ type: CreateReviewDto })
  @ApiCreatedResponse({ description: 'Review berhasil dibuat.' })
  create(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewsService.create(createReviewDto);
  }

  @Public()
  @Get()
  @ApiOperation({ summary: 'Ambil semua review' })
  @ApiOkResponse({ description: 'Daftar review berhasil diambil.' })
  findAll() {
    return this.reviewsService.findAll();
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Ambil detail review berdasarkan ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID review' })
  @ApiOkResponse({ description: 'Detail review berhasil diambil.' })
  findOne(@Param('id') id: string) {
    return this.reviewsService.findOne(+id);
  }

  @Public()
  @Patch(':id')
  @ApiOperation({ summary: 'Perbarui review berdasarkan ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID review' })
  @ApiBody({ type: UpdateReviewDto })
  @ApiOkResponse({ description: 'Review berhasil diperbarui.' })
  update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewsService.update(+id, updateReviewDto);
  }

  @Public()
  @Delete(':id')
  @ApiOperation({ summary: 'Hapus review berdasarkan ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID review' })
  @ApiOkResponse({ description: 'Review berhasil dihapus.' })
  remove(@Param('id') id: string) {
    return this.reviewsService.remove(+id);
  }
}
