import { useAddRewardSchema } from '@/common/schemas/append-reward.schema';
import { YupValidationPipe } from '@/common/pipes/yup-validation.pipe';
import { Body, Controller, Post, Response } from '@nestjs/common';
import { AddRewardDto } from '@/common/dto/add-reward.dto';
import { StatusCodes as HTTP } from 'http-status-codes';
import { RewardsService } from './rewards.service';

@Controller({
  path: 'rewards',
})
export class RewardsController {
  constructor(private readonly rewardsService: RewardsService) {}

  @Post('create')
  async create(
    @Body(new YupValidationPipe(useAddRewardSchema()))
    addRewardDto: AddRewardDto,
    @Response() response,
  ) {
    const reward = await this.rewardsService.save(addRewardDto);

    return response.status(HTTP.CREATED).send(reward);
  }
}
