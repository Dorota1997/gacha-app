import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { MikroOrmModule } from '@mikro-orm/nestjs';

import { AuthModule } from '@/auth/auth.module';
import { UsersModule } from '@/users/users.module';
import { RewardsModule } from '@/rewards/rewards.module';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MikroOrmModule.forRoot(),
    AuthModule,
    UsersModule,
    RewardsModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
