import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { BcryptService } from 'src/common/bcrypt/bcrypt.service';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guard/role.guard';

@Global()
@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '12h' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    { provide: APP_GUARD, useClass: RolesGuard },
    AuthService,
    BcryptService,
  ],
})
export class AuthModule {}
