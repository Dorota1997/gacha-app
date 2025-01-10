import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { RewardsModule } from '@/rewards/rewards.module';
import { UsersModule } from '@/users/users.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { AuthModule } from '@/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { Module } from '@nestjs/common';

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
