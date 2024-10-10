import { Controller, Post, UseGuards, Request, Get } from '@nestjs/common';

import { AuthService } from './auth.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { LocalAuthGuard } from 'src/common/guards/local-auth.guard';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/sign-in')
  async login(@Request() request) {
    return this.authService.signIn(request.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('auth/profile')
  getProfile(@Request() request) {
    return request.user;
  }
}
