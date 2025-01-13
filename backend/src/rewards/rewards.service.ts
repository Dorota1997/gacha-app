import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';

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

  findOne(id: string): Promise<Reward | null> {
    return this.entityManager.findOne(Reward, id);
  }

  async updateSingleProperty<T>(
    reward: Reward,
    property: keyof Reward,
    value: T,
  ) {
    this.entityManager.assign<Reward>(reward, { [property]: value });

    await this.entityManager.flush();
  }

  async remove(reward: Reward) {
    await this.entityManager.removeAndFlush(reward);
  }
}
