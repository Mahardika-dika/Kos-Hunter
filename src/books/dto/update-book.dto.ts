import { PartialType } from '@nestjs/mapped-types';
import { CreateBookDto } from './create-book.dto';
import { $Enums } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsOptional, IsNumber, IsEnum, IsDate } from 'class-validator';

export class UpdateBookDto extends PartialType(CreateBookDto) {
  @IsOptional()
  @IsNumber()
  kos_id!: number;

  @IsOptional()
  @IsNumber()
  user_id!: number;

  @IsOptional()
  @IsEnum($Enums.Status)
  status!: $Enums.Status;

  @Type(() => Date)
  @IsOptional()
  @IsDate()
  start_date!: Date;

  @Type(() => Date)
  @IsOptional()
  @IsNumber()
  end_date?: Date;
}
