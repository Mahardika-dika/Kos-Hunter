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
  @IsString({ message: 'The name property must be filled with a string.' })
  @IsNotEmpty({ message: 'The name property cannot be empty' })
  name!: string;

  @IsString({ message: 'The E - Mail property must be filled with a string.' })
  @IsEmail()
  @IsNotEmpty({ message: 'The E-mail property cannot be empty' })
  email!: string;

  @IsString({ message: 'The Password property must be filled with a string.' })
  @IsNotEmpty({ message: 'The password property cannot be empty' })
  password!: string;

  @IsString({ message: 'The Phone property must be filled with a string.' })
  @IsPhoneNumber()
  @IsOptional()
  phone?: string;

  @Transform(({ value }) => normalizePublicRole(value))
  @IsEnum(PublicRole, {
    message: 'The role property must be filled with the options provided.',
  })
  @IsOptional()
  role!: PublicRole;
}
