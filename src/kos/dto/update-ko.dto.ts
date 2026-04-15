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
import { $Enums } from 'generated/prisma/browser';

export class UpdateKoDto extends PartialType(CreateKoDto) {
  @IsString()
  @IsOptional()
  name!: string;

  @IsString()
  @IsOptional()
  address!: string;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsOptional()
  price_per_month!: number;

  @IsEnum($Enums.Gender)
  @IsOptional()
  gender!: $Enums.Gender;

  @IsString()
  @IsOptional()
  description!: string;

  @Transform(({ value }): string[] => {
    if (typeof value === 'string') {
      return JSON.parse(value) as string[];
    }
    return value;
  })
  @IsOptional()
  fasility!: string[];

  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  @IsNotEmpty()
  ai!: boolean;
}
