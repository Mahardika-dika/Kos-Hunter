import { PartialType } from '@nestjs/mapped-types';
import { CreateReviewDto } from './create-review.dto';
import { IsOptional, IsNumber } from 'class-validator';

export class UpdateReviewDto extends PartialType(CreateReviewDto) {
  @IsOptional()
  @IsNumber()
  kos_id!: number;
  @IsOptional()
  @IsNumber()
  comment!: string;
  @IsOptional()
  @IsNumber()
  user_id?: number;
}
