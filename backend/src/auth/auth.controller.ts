import { ApiTags } from '@nestjs/swagger';
import { StatusCodes as HTTP } from 'http-status-codes';
import { Get, Body, Post, Request, Response, Controller } from '@nestjs/common';

import { AuthService } from './auth.service';
import { Config } from '@/common/enums/config.enum';
import { SignInDto } from '@/common/dto/sign-in.dto';
import { Public } from '@/common/decorators/public.decorator';
import { signInSchema } from '@/common/schemas/sign-in.schema';
import { YupValidationPipe } from '@/common/pipes/yup-validation.pipe';

@ApiTags('Auth')
@Controller({
  path: 'auth',
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('sign-in')
  async signIn(
    @Body(new YupValidationPipe(signInSchema)) dto: SignInDto,
    @Response() response,
  ) {
    const user = await this.authService.validateUser(dto);

    if (!user) {
      return response.status(HTTP.UNAUTHORIZED).send();
    }

    const result = this.authService.signUser(user);

    response.cookie(Config.JWT_COOKIE_KEY, result.token, {
      httpOnly: true,
    });

    return response.status(HTTP.OK).send(result);
  }

  @Get('status')
  status(@Request() request) {
    return request.user;
  }

  @Post('sign-out')
  signOut(@Response() response) {
    response.clearCookie(Config.JWT_COOKIE_KEY);
    return response.status(HTTP.OK).send();
  }
}
