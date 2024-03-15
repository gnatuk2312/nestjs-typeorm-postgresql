import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { UserModule } from '../user/user.module';
import { AUTH_SERVICE, TOKEN_SERVICE } from './auth.constants';
import { AuthService } from './auth.service';
import { TokenService } from './token.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [UserModule, JwtModule],
  providers: [
    {
      provide: AUTH_SERVICE,
      useClass: AuthService,
    },
    {
      provide: TOKEN_SERVICE,
      useClass: TokenService,
    },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
