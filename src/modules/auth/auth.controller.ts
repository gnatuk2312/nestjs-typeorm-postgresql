import { Body, Controller, Inject, Post } from '@nestjs/common';

import { AUTH_SERVICE } from './auth.constants';
import { AuthServiceInterface } from './interface/auth-service.interface';
import { SignUpDTO } from './dto/sign-up.dto';
import { SignInDTO } from './dto/sign-in.dto';
import { RefreshTokenDTO } from './dto/refresh-token.dto';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(AUTH_SERVICE) private readonly authService: AuthServiceInterface,
  ) {}

  @Post('/sign-up')
  public async signUp(@Body() dto: SignUpDTO) {
    return await this.authService.signUp(dto);
  }

  @Post('/sign-in')
  public async signIn(@Body() dto: SignInDTO) {
    return await this.authService.signIn(dto);
  }

  @Post('/refresh-token')
  public async refreshToken(@Body() dto: RefreshTokenDTO) {
    return await this.authService.refreshToken(dto);
  }
}
