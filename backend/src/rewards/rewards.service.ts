import { AppendRewardDto } from '@/common/dto/append-reward.dto';
import { Reward } from '@/entities/reward.entity';
import { EntityManager } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RewardsService {
  constructor(private readonly entityManager: EntityManager) {}

  async append({ name, quantity, chance }: AppendRewardDto): Promise<Reward> {
    const reward = new Reward(name, quantity, chance);

    await this.entityManager.persist(reward).flush();

    return reward;
  }
}
