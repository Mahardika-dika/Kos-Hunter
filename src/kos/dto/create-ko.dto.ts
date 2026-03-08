import { $Enums } from '@prisma/client';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateKoDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  address!: string;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsNotEmpty()
  price_per_month!: number;

  @IsEnum($Enums.Gender)
  @IsNotEmpty()
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
  @IsNotEmpty()
  fasility!: string[];

  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  @IsNotEmpty()
  ai!: boolean;
}
