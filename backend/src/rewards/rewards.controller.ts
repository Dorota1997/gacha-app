import { ApiTags } from '@nestjs/swagger';
import { StatusCodes as HTTP } from 'http-status-codes';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Response,
} from '@nestjs/common';

import { RewardsService } from './rewards.service';
import { AddRewardDto } from '@/common/dto/add-reward.dto';
import { Admin } from '@/common/decorators/admin.decorator';
import { YupValidationPipe } from '@/common/pipes/yup-validation.pipe';
import { useAddRewardSchema } from '@/common/schemas/add-reward.schema';
import { UpdateRewardNameDto } from '@/common/dto/update-reward-name.dto';
import { UpdateRewardChanceDto } from '@/common/dto/update-reward-chance.dto';
import { UpdateRewardQuantityDto } from '@/common/dto/update-reward-quantity.dto';
import { useUpdateRewardNameSchema } from '@/common/schemas/update-reward-name.schema';
import { useUpdateRewardChanceSchema } from '@/common/schemas/update-reward-chance.schema';
import { useUpdateRewardQuantitySchema } from '@/common/schemas/update-reward-quantity.schema';

@ApiTags('Rewards')
@Controller({
  path: 'rewards',
})
export class RewardsController {
  constructor(private readonly rewardsService: RewardsService) {}

  @Admin()
  @Get('uncut')
  async fetchAllForAdmin(@Response() response) {
    const rewards = await this.rewardsService.findAll({ includeChance: true });

    return response.status(HTTP.OK).send(rewards);
  }

  @Get()
  async fetchAll(@Response() response) {
    const rewards = await this.rewardsService.findAll();

    return response.status(HTTP.OK).send(rewards);
  }

  @Admin()
  @Post()
  async create(
    @Body(new YupValidationPipe(useAddRewardSchema()))
    data: AddRewardDto,
    @Response() response,
  ) {
    const reward = await this.rewardsService.save(data);

    return response.status(HTTP.CREATED).send(reward);
  }

  @Admin()
  @Patch(':id/update-name')
  async updateName(
    @Param('id') id: string,
    @Body(new YupValidationPipe(useUpdateRewardNameSchema()))
    data: UpdateRewardNameDto,
    @Response() response,
  ) {
    const reward = await this.rewardsService.findOne(id);

    if (!reward) {
      return response.status(HTTP.NOT_FOUND).send();
    }

    await this.rewardsService.updateSingleProperty(reward, 'name', data.name);

    return response.status(HTTP.OK).send();
  }

  @Admin()
  @Patch(':id/update-quantity')
  async updateQuantity(
    @Param('id') id: string,
    @Body(new YupValidationPipe(useUpdateRewardQuantitySchema()))
    data: UpdateRewardQuantityDto,
    @Response() response,
  ) {
    const reward = await this.rewardsService.findOne(id);

    if (!reward) {
      return response.status(HTTP.NOT_FOUND).send();
    }

    await this.rewardsService.updateSingleProperty(
      reward,
      'quantity',
      data.quantity,
    );

    return response.status(HTTP.OK).send();
  }

  @Admin()
  @Patch(':id/update-chance')
  async updateChance(
    @Param('id') id: string,
    @Body(new YupValidationPipe(useUpdateRewardChanceSchema()))
    data: UpdateRewardChanceDto,
    @Response() response,
  ) {
    const reward = await this.rewardsService.findOne(id);

    if (!reward) {
      return response.status(HTTP.NOT_FOUND).send();
    }

    await this.rewardsService.updateSingleProperty(
      reward,
      'chance',
      data.chance,
    );

    return response.status(HTTP.OK).send();
  }

  @Admin()
  @Delete(':id')
  async remove(@Param('id') id: string, @Response() response) {
    const reward = await this.rewardsService.findOne(id);

    if (reward) {
      await this.rewardsService.remove(reward);
    }

    return response.status(HTTP.NO_CONTENT).send();
  }
}
