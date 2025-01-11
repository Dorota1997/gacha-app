import { Injectable } from '@nestjs/common';
import { EntityManager, wrap } from '@mikro-orm/core';

import { Reward } from '@/entities/reward.entity';
import { AddRewardDto } from '@/common/dto/add-reward.dto';

@Injectable()
export class RewardsService {
  constructor(private readonly entityManager: EntityManager) {}

  async save({ name, quantity, chance }: AddRewardDto): Promise<Reward> {
    const reward = new Reward(name, quantity, chance);

    await this.entityManager.persist(reward).flush();

    return reward;
  }

  findOne(uuid: string): Promise<Reward | null> {
    return this.entityManager.findOne(Reward, uuid);
  }

  updateName(reward: Reward, name) {
    wrap(reward).assign({ name });

    this.entityManager.flush();
  }
}
