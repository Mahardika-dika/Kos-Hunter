import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { $Enums } from 'generated/prisma/browser';

export class CreateKoDto {
  @ApiProperty({ example: 'Kos Melati Putri', description: 'Nama kos.' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({
    example: 'Jl. Melati No. 8, Yogyakarta',
    description: 'Alamat lengkap kos.',
  })
  @IsString()
  @IsNotEmpty()
  address!: string;

  @ApiProperty({ example: 1200000, description: 'Harga sewa per bulan.' })
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsNotEmpty()
  price_per_month!: number;

  @ApiProperty({
    enum: $Enums.Gender,
    example: 'FEMALE',
    description: 'Kategori penghuni kos.',
  })
  @IsEnum($Enums.Gender)
  @IsNotEmpty()
  gender!: $Enums.Gender;

  @ApiPropertyOptional({
    example: 'Kos nyaman, dekat kampus, bebas 24 jam.',
    description: 'Deskripsi tambahan kos.',
  })
  @IsString()
  @IsOptional()
  description!: string;

  @ApiProperty({
    type: [String],
    example: ['WiFi', 'AC', 'Kamar Mandi Dalam'],
    description:
      'Daftar fasilitas kos. Saat multipart/form-data, boleh kirim JSON string array.',
  })
  @Transform(({ value }): string[] => {
    if (typeof value === 'string') {
      return JSON.parse(value) as string[];
    }
    return value;
  })
  @IsNotEmpty()
  fasility!: string[];

  @ApiProperty({
    example: true,
    description: 'Aktifkan/deskripsikan AI untuk melengkapi deskripsi kos.',
  })
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  @IsNotEmpty()
  ai!: boolean;
}
