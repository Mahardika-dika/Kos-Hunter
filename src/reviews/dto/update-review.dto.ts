import { PartialType } from '@nestjs/mapped-types';
import { CreateReviewDto } from './create-review.dto';
import { IsOptional, IsNumber, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateReviewDto extends PartialType(CreateReviewDto) {
  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsNumber()
  kos_id!: number;

  @ApiPropertyOptional({ example: 'Kamar luas dan fasilitas lengkap.' })
  @IsOptional()
  @IsString()
  comment!: string;

  @ApiPropertyOptional({ example: 2 })
  @IsOptional()
  @IsNumber()
  user_id?: number;
}
