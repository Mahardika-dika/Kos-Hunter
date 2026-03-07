import { PartialType } from '@nestjs/mapped-types';
import { CreateKoDto } from './create-ko.dto';
import { IsNumber, IsOptional, IsString, IsEnum } from 'class-validator';
import { $Enums } from 'generated/prisma';
import { Transform } from 'class-transformer';

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

  @Transform(({ value }): string[] => {
    if (typeof value === 'string') {
      return JSON.parse(value) as string[];
    }
    return value;
  })
  @IsOptional()
  fasility!: string[];
}
