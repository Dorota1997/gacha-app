import { Body, Post, Response, Controller } from '@nestjs/common';
import { StatusCodes as HTTP } from 'http-status-codes';

import { UsersService } from './users.service';
import { SignUpDto } from '@/common/dto/sign-up.dto';
import { Public } from '@/common/decorators/public.decorator';
import { useSignUpSchema } from '@/common/schemas/sign-up.schema';
import { YupValidationPipe } from '@/common/pipes/yup-validation.pipe';

@Controller({
  path: 'users',
})
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Public()
  @Post('sign-up')
  async signIn(
    @Body(new YupValidationPipe(useSignUpSchema())) dto: SignUpDto,
    @Response() response,
  ) {
    const user = await this.userService.signUp(dto);

    // @TODO implement email verification

    return response.status(HTTP.CREATED).send(user);
  }
}
