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
  IsStrongPassword,
} from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString({ message: 'The name property must be filled with a string.' })
  @IsOptional()
  name!: string;

  @IsString({ message: 'The E - Mail property must be filled with a string.' })
  @IsEmail()
  @IsOptional()
  email!: string;

  @IsString({ message: 'The Password property must be filled with a string.' })
  @IsStrongPassword({ minLength: 5, minUppercase: 1, minNumbers: 1 })
  @IsOptional()
  password!: string;

  @IsString({ message: 'The Phone property must be filled with a string.' })
  @IsPhoneNumber()
  @IsOptional()
  phone!: string;

  @Transform(({ value }) => normalizePublicRole(value))
  @IsEnum(PublicRole, {
    message: 'The role property must be filled with the options provided.',
  })
  @IsOptional()
  role?: PublicRole;
}
