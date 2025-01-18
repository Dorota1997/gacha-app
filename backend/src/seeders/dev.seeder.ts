import { Seeder } from '@mikro-orm/seeder';
import { EntityManager } from '@mikro-orm/postgresql';

import { User } from '@/entities/user.entity';
import { Role } from '@/entities/role.entity';
import { UserRole } from '@/common/enums/role.enum';

// @NOTE only for development purposes
export class DevSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const admin = em.create(Role, {
      name: UserRole.Admin,
    });

    const member = em.create(Role, {
      name: UserRole.Member,
    });

    em.create(User, {
      username: 'test',
      password: '1234',
      role: admin,
    });

    em.create(User, {
      username: 'member',
      password: '1234',
      role: member,
    });
  }
}
