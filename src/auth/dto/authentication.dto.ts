import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthenticationDto {
  @IsString({ message: 'The E - Mail property must be filled with a string.' })
  @IsEmail()
  @IsNotEmpty({ message: 'The E-mail property cannot be empty' })
  email!: string;

  @IsString({ message: 'The Password property must be filled with a string.' })
  @IsNotEmpty({ message: 'The password property cannot be empty' })
  password!: string;
}
