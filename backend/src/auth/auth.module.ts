import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { MikroOrmModule } from '@mikro-orm/nestjs';

import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { User } from 'src/entities/user.entity';
import { AuthController } from './auth.controller';
import { Config } from 'src/common/enums/config.enum';

@Module({
  imports: [
    MikroOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get(Config.JWT_SECRET),
        signOptions: {
          expiresIn: configService.get(Config.JWT_ACCESS_TOKEN_EXPIRATION),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
