import { Public } from '@/common/decorators/public.decorator';
import { YupValidationPipe } from '@/common/pipes/yup-validation.pipe';
import { useAppendRewardSchema } from '@/common/schemas/append-reward.schema';
import { Body, Controller, Post, Response } from '@nestjs/common';
import { StatusCodes as HTTP } from 'http-status-codes';
import { RewardsService } from './rewards.service';
import { AppendRewardDto } from '@/common/dto/append-reward.dto';

@Controller({
  path: 'rewards',
})
export class RewardsController {
  constructor(private readonly rewardsService: RewardsService) {}

  @Public()
  @Post('create')
  async create(
    @Body(new YupValidationPipe(useAppendRewardSchema())) dto: AppendRewardDto,
    @Response() response,
  ) {
    const reward = await this.rewardsService.append(dto);

    return response.status(HTTP.CREATED).send(reward);
  }
}
