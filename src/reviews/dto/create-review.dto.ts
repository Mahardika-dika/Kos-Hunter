import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateReviewDto {
  @ApiProperty({ example: 1, description: 'ID kos yang direview.' })
  @IsNotEmpty()
  @IsNumber()
  kos_id!: number;

  @ApiProperty({
    example: 'Kos bersih dan owner responsif.',
    description: 'Isi komentar review.',
  })
  @IsNotEmpty()
  @IsString()
  comment!: string;

  @ApiPropertyOptional({ example: 3, description: 'ID user pemberi review.' })
  @IsOptional()
  @IsNumber()
  user_id?: number;
}
