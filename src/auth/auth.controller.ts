import { Controller, Post, Body } from '@nestjs/common';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthenticationDto } from './dto/authentication.dto';
import { Public } from './decorators/public.decorators';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @ApiOperation({ summary: 'Login user dan dapatkan access token' })
  @ApiBody({ type: AuthenticationDto })
  @ApiOkResponse({
    description: 'Login berhasil.',
    schema: {
      example: {
        success: true,
        message: 'LogIn successfully',
        data: {
          id: 1,
          email: 'user@mail.com',
          role: 'OWNER',
          access_token: 'jwt.token.value',
        },
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Email atau password tidak valid.',
  })
  async auth(@Body() authenticationDto: AuthenticationDto) {
    const res = await this.authService.auth(authenticationDto);
    return {
      success: true,
      message: 'LogIn successfully',
      data: res,
    };
  }
}
