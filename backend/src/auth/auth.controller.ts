import { Controller, Post, UseGuards, Request, Get } from '@nestjs/common';

import { AuthService } from './auth.service';
import { Public } from 'src/common/decorators/Public';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
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
