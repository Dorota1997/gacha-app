import { Request } from 'express';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';

import { Config } from '@/common/enums/config.enum';

const jwtFromRequest = ExtractJwt.fromExtractors([
  (request: Request) => {
    if (
      request.cookies &&
      Config.JWT_COOKIE_KEY in request.cookies &&
      request.cookies[Config.JWT_COOKIE_KEY].length > 0
    ) {
      return request.cookies[Config.JWT_COOKIE_KEY];
    }

    return null;
  },
  ExtractJwt.fromAuthHeaderAsBearerToken(),
]);

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest,
      ignoreExpiration: false,
      secretOrKey: configService.get(Config.JWT_SECRET),
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}
