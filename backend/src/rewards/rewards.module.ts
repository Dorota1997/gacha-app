import { Module } from '@nestjs/common';

import { RewardsService } from './rewards.service';
import { RewardsController } from './rewards.controller';

@Module({
  imports: [],
  controllers: [RewardsController],
  providers: [RewardsService],
  exports: [],
})
export class RewardsModule {}
