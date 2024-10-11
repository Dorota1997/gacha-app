import {
  Get,
  Body,
  Post,
  Request,
  UseGuards,
  Controller,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { Public } from 'src/common/decorators/Public';
import { SignInDto } from 'src/common/dto/sign-in.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('auth/sign-in')
  async login(@Body() dto: SignInDto) {
    return this.authService.signIn(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('auth/profile')
  getProfile(@Request() request) {
    return request.user;
  }
}
