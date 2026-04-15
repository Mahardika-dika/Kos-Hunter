import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { $Enums } from 'generated/prisma/browser';

export class CreateBookDto {
  @ApiProperty({ example: 2, description: 'ID kos yang dibooking.' })
  @IsNotEmpty()
  @IsNumber()
  kos_id!: number;

  @ApiProperty({ example: 1, description: 'ID user pemesan kos.' })
  @IsNotEmpty()
  @IsNumber()
  user_id!: number;

  @ApiProperty({
    enum: $Enums.Status,
    example: 'PENDING',
    description: 'Status booking.',
  })
  @IsNotEmpty()
  @IsEnum($Enums.Status)
  status!: $Enums.Status;

  @ApiProperty({
    example: '2026-04-20T00:00:00.000Z',
    description: 'Tanggal mulai sewa kos (ISO date).',
  })
  @Type(() => Date)
  @IsNotEmpty()
  @IsDate()
  start_date!: Date;

  @ApiProperty({
    required: false,
    example: '2026-10-20T00:00:00.000Z',
    description: 'Tanggal akhir sewa kos (opsional).',
  })
  @Type(() => Date)
  @IsOptional()
  @IsDate()
  end_date?: Date;
}
