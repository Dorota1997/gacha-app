import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';
import { EntityManager as EntityManagerSql } from '@mikro-orm/postgresql';

import { Reward } from '@/entities/reward.entity';
import { AddRewardDto } from '@/common/dto/add-reward.dto';
import { GetRewardDto } from '@/common/dto/get-reward.dto';
import { GetUserRewardDto } from '@/common/dto/get-user-reward.dto';

@Injectable()
export class RewardsService {
  constructor(
    private readonly entityManager: EntityManager,
    private readonly entityManagerSql: EntityManagerSql,
  ) {}

  async findAllForAdmin(): Promise<GetRewardDto[]> {
    return this.entityManager.findAll(Reward);
  }

  async findAll(): Promise<GetUserRewardDto[]> {
    return this.entityManagerSql
      .createQueryBuilder(Reward)
      .select(['uuid', 'name', 'quantity']);
  }

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

  remove(reward: Reward) {
    return this.entityManager.removeAndFlush(reward);
  }
}
