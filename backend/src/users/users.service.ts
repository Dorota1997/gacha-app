import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';

import { User } from '@/entities/user.entity';
import { SignUpDto } from '@/common/dto/sign-up.dto';

@Injectable()
export class UsersService {
  constructor(private readonly entityManager: EntityManager) {}

  async signUp({ username, password }: SignUpDto): Promise<User> {
    const user = new User(username, password);

    await this.entityManager.persist(user).flush();

    return user;
  }
}
