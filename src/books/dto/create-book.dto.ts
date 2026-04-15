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
  @IsNotEmpty()
  @IsNumber()
  kos_id!: number;

  @IsNotEmpty()
  @IsNumber()
  user_id!: number;

  @IsNotEmpty()
  @IsEnum($Enums.Status)
  status!: $Enums.Status;

  @Type(() => Date)
  @IsNotEmpty()
  @IsDate()
  start_date!: Date;

  @Type(() => Date)
  @IsOptional()
  @IsNumber()
  end_date?: Date;
}
