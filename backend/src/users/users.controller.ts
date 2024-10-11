import { Body, Post, Response, Controller } from '@nestjs/common';
import { StatusCodes as HTTP } from 'http-status-codes';

import { UsersService } from './users.service';
import { SignUpDto } from 'src/common/dto/sign-up.dto';
import { Public } from 'src/common/decorators/public.decorator';

@Controller({
  path: 'users',
})
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Public()
  @Post('sign-up')
  async signIn(@Body() dto: SignUpDto, @Response() response) {
    const user = await this.userService.signUp(dto);

    return response.status(HTTP.CREATED).send(user);
  }
}
