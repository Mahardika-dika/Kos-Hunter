import { PartialType } from '@nestjs/mapped-types';
import { CreateBookDto } from './create-book.dto';
import { Type } from 'class-transformer';
import { IsOptional, IsNumber, IsEnum, IsDate } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { $Enums } from 'generated/prisma/browser';

export class UpdateBookDto extends PartialType(CreateBookDto) {
  @ApiPropertyOptional({ example: 2, description: 'ID kos yang dibooking.' })
  @IsOptional()
  @IsNumber()
  kos_id!: number;

  @ApiPropertyOptional({ example: 1, description: 'ID user pemesan kos.' })
  @IsOptional()
  @IsNumber()
  user_id!: number;

  @ApiPropertyOptional({ enum: $Enums.Status, example: 'APPROVED' })
  @IsOptional()
  @IsEnum($Enums.Status)
  status!: $Enums.Status;

  @ApiPropertyOptional({ example: '2026-05-01T00:00:00.000Z' })
  @Type(() => Date)
  @IsOptional()
  @IsDate()
  start_date!: Date;

  @ApiPropertyOptional({ example: '2026-11-01T00:00:00.000Z' })
  @Type(() => Date)
  @IsOptional()
  @IsDate()
  end_date?: Date;
}
