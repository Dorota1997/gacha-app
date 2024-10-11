import { Body, Post, Response, Controller } from '@nestjs/common';
import { StatusCodes as HTTP } from 'http-status-codes';

import { UsersService } from './users.service';
import { SignUpDto } from 'src/common/dto/sign-up.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { useSignUpSchema } from 'src/common/schemas/sign-up.schema';
import { YupValidationPipe } from 'src/common/pipes/yup-validation.pipe';

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

    return response.status(HTTP.CREATED).send(user);
  }
}
