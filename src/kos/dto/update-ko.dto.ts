import { PartialType } from '@nestjs/mapped-types';
import { CreateKoDto } from './create-ko.dto';
import {
  IsNumber,
  IsOptional,
  IsString,
  IsEnum,
  IsBoolean,
  IsNotEmpty,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { $Enums } from 'generated/prisma/browser';

export class UpdateKoDto extends PartialType(CreateKoDto) {
  @ApiPropertyOptional({ example: 'Kos Melati Putra' })
  @IsString()
  @IsOptional()
  name!: string;

  @ApiPropertyOptional({ example: 'Jl. Kenanga No. 5, Semarang' })
  @IsString()
  @IsOptional()
  address!: string;

  @ApiPropertyOptional({ example: 1300000 })
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsOptional()
  price_per_month!: number;

  @ApiPropertyOptional({ enum: $Enums.Gender, example: 'MALE' })
  @IsEnum($Enums.Gender)
  @IsOptional()
  gender!: $Enums.Gender;

  @ApiPropertyOptional({ example: 'Kos bersih dan aman.' })
  @IsString()
  @IsOptional()
  description!: string;

  @ApiPropertyOptional({ type: [String], example: ['WiFi', 'Parkir Motor'] })
  @Transform(({ value }): string[] => {
    if (typeof value === 'string') {
      return JSON.parse(value) as string[];
    }
    return value;
  })
  @IsOptional()
  fasility!: string[];

  @ApiPropertyOptional({ example: false })
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  @IsNotEmpty()
  ai!: boolean;
}
