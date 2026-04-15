import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthenticationDto } from './dto/authentication.dto';
import { Public } from './decorators/public.decorators';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  async auth(@Body() authenticationDto: AuthenticationDto) {
    const res = await this.authService.auth(authenticationDto);
    return {
      success: true,
      message: 'LogIn successfully',
      data: res,
    };
  }
}
