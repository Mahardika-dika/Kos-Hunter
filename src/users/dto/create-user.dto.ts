import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { PublicRole } from 'src/common/enums/public-role.enums';
import { normalizePublicRole } from 'src/common/utils/role.utils';

export class CreateUserDto {
  @ApiProperty({ example: 'Budi Santoso', description: 'Nama lengkap user.' })
  @IsString({ message: 'The name property must be filled with a string.' })
  @IsNotEmpty({ message: 'The name property cannot be empty' })
  name!: string;

  @ApiProperty({ example: 'budi@mail.com', description: 'Email user.' })
  @IsString({ message: 'The E - Mail property must be filled with a string.' })
  @IsEmail()
  @IsNotEmpty({ message: 'The E-mail property cannot be empty' })
  email!: string;

  @ApiProperty({
    example: 'StrongPassword123!',
    description: 'Password user (akan di-hash).',
  })
  @IsString({ message: 'The Password property must be filled with a string.' })
  @IsNotEmpty({ message: 'The password property cannot be empty' })
  password!: string;

  @ApiPropertyOptional({
    example: '+6281234567890',
    description: 'Nomor telepon user.',
  })
  @IsString({ message: 'The Phone property must be filled with a string.' })
  @IsPhoneNumber()
  @IsOptional()
  phone?: string;

  @ApiPropertyOptional({
    enum: PublicRole,
    example: PublicRole.SOCIETY,
    description: 'Peran user (OWNER / SOCIETY).',
  })
  @Transform(({ value }) => normalizePublicRole(value))
  @IsEnum(PublicRole, {
    message: 'The role property must be filled with the options provided.',
  })
  @IsOptional()
  role!: PublicRole;
}
