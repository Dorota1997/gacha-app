import { StatusCodes as HTTP } from 'http-status-codes';
import { Body, Controller, Patch, Post, Response } from '@nestjs/common';

import { RewardsService } from './rewards.service';
import { AddRewardDto } from '@/common/dto/add-reward.dto';
import { YupValidationPipe } from '@/common/pipes/yup-validation.pipe';
import { UpdateRewardNameDto } from '@/common/dto/update-reward-name.dto';
import { useAddRewardSchema } from '@/common/schemas/append-reward.schema';
import { useUpdateRewardNameSchema } from '@/common/schemas/update-reward-name.schema';

@Controller({
  path: 'rewards',
})
export class RewardsController {
  constructor(private readonly rewardsService: RewardsService) {}

  @Post()
  async create(
    @Body(new YupValidationPipe(useAddRewardSchema()))
    data: AddRewardDto,
    @Response() response,
  ) {
    const reward = await this.rewardsService.save(data);

    return response.status(HTTP.CREATED).send(reward);
  }

  @Patch('update-name')
  async update(
    @Body(new YupValidationPipe(useUpdateRewardNameSchema()))
    data: UpdateRewardNameDto,
    @Response() response,
  ) {
    const reward = await this.rewardsService.findOne(data.id);

    if (!reward) {
      return response.statuts(HTTP.NOT_FOUND).send();
    }

    await this.rewardsService.updateName(reward, data.name);

    return response.status(HTTP.OK).send();
  }
}
