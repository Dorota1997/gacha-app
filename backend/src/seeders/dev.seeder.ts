import { Seeder } from '@mikro-orm/seeder';
import { EntityManager } from '@mikro-orm/postgresql';

import { User } from '../entities/user.entity';

// @NOTE only for development purposes
export class DevSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    em.create(User, {
      username: 'test',
      password: '1234',
    });
  }
}
