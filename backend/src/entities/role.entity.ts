import {
  Enum,
  Entity,
  OneToMany,
  Collection,
  PrimaryKey,
} from '@mikro-orm/core';
import { User } from './user.entity';
import { UserRole } from '@/common/enums/role.enum';

@Entity({
  tableName: 'roles',
})
export class Role {
  constructor(name: UserRole) {
    this.name = name;
  }

  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  uuid: string;

  @Enum(() => UserRole)
  name!: UserRole;

  @OneToMany(() => User, (user) => user.role)
  users = new Collection<User>(this);
}
