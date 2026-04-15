import { PartialType } from '@nestjs/mapped-types';
import { Transform } from 'class-transformer';
import { PublicRole } from 'src/common/enums/public-role.enums';
import { normalizePublicRole } from 'src/common/utils/role.utils';
import { CreateUserDto } from './create-user.dto';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiPropertyOptional({ example: 'Siti Aminah' })
  @IsString({ message: 'The name property must be filled with a string.' })
  @IsOptional()
  name!: string;

  @ApiPropertyOptional({ example: 'siti@mail.com' })
  @IsString({ message: 'The E - Mail property must be filled with a string.' })
  @IsEmail()
  @IsOptional()
  email!: string;

  @ApiPropertyOptional({ example: 'NewStrongPassword123!' })
  @IsString({ message: 'The Password property must be filled with a string.' })
  @IsOptional()
  password!: string;

  @ApiPropertyOptional({ example: '+6289876543210' })
  @IsString({ message: 'The Phone property must be filled with a string.' })
  @IsPhoneNumber()
  @IsOptional()
  phone!: string;

  @ApiPropertyOptional({ enum: PublicRole, example: PublicRole.OWNER })
  @Transform(({ value }) => normalizePublicRole(value))
  @IsEnum(PublicRole, {
    message: 'The role property must be filled with the options provided.',
  })
  @IsOptional()
  role?: PublicRole;
}
