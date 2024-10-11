import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';

import { User } from 'src/entities/user.entity';
import { SignInDto } from 'src/common/dto/sign-in.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private em: EntityManager,
  ) {}

  async validateUser({ username, password }: SignInDto): Promise<User | null> {
    const userRepository = this.em.getRepository(User);

    const user = await userRepository.findOne({ username });

    if (!user) {
      return null;
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      return null;
    }

    return user;
  }

  signUser(user: User) {
    const { username, uuid } = user;

    const payload = { username, sub: uuid };

    return {
      username,
      token: this.jwtService.sign(payload),
    };
  }
}
