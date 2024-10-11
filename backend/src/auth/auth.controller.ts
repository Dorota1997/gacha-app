import {
  Get,
  Body,
  Post,
  Request,
  Response,
  UseGuards,
  Controller,
} from '@nestjs/common';
import { StatusCodes as HTTP } from 'http-status-codes';

import { AuthService } from './auth.service';
import { SignInDto } from 'src/common/dto/sign-in.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { Public } from 'src/common/decorators/public.decorator';

@Controller({
  path: 'auth',
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('sign-in')
  async signIn(@Body() dto: SignInDto, @Response() response) {
    const user = await this.authService.validateUser(dto);

    if (!user) {
      return response.status(HTTP.UNAUTHORIZED).send();
    }

    const result = this.authService.signUser(user);

    return response.status(HTTP.OK).send(result);
  }

  @UseGuards(JwtAuthGuard)
  @Get('status')
  status(@Request() request) {
    return request.user;
  }

  @UseGuards(JwtAuthGuard)
  @Post('sign-out')
  signOut(@Request() request, @Response() response) {
    return response.status(HTTP.OK).send();
  }
}
