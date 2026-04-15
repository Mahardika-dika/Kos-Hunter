import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateReviewDto {
  @IsNotEmpty()
  @IsNumber()
  kos_id!: number;
  @IsNotEmpty()
  @IsNumber()
  comment!: string;
  @IsOptional()
  @IsNumber()
  user_id?: number;
}
