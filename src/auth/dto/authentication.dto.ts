import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthenticationDto {
  @ApiProperty({
    example: 'user@mail.com',
    description: 'Email yang terdaftar pada sistem.',
  })
  @IsString({ message: 'The E - Mail property must be filled with a string.' })
  @IsEmail()
  @IsNotEmpty({ message: 'The E-mail property cannot be empty' })
  email!: string;

  @ApiProperty({
    example: 'StrongPassword123!',
    description: 'Password akun user.',
  })
  @IsString({ message: 'The Password property must be filled with a string.' })
  @IsNotEmpty({ message: 'The password property cannot be empty' })
  password!: string;
}
