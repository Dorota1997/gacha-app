import { AddRewardDto } from '@/common/dto/add-reward.dto';
import { Reward } from '@/entities/reward.entity';
import { EntityManager } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RewardsService {
  constructor(private readonly entityManager: EntityManager) {}

  async save({ name, quantity, chance }: AddRewardDto): Promise<Reward> {
    const reward = new Reward(name, quantity, chance);

    await this.entityManager.persist(reward).flush();

    return reward;
  }
}
