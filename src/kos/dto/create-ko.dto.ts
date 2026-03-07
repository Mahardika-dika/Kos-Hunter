import { $Enums } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

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

  @Transform(({ value }): string[] => {
    if (typeof value === 'string') {
      return JSON.parse(value) as string[];
    }
    return value;
  })
  @IsNotEmpty()
  fasility!: string[];
}
