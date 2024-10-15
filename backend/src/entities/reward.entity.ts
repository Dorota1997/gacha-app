import {
  Entity,
  Property,
  Collection,
  FloatType,
  ManyToMany,
  PrimaryKey,
} from '@mikro-orm/core';
import { User } from './user.entity';

@Entity({
  tableName: 'rewards',
})
export class Reward {
  constructor(name: string, quantity: number, chance: number) {
    this.name = name;
    this.quantity = quantity;
    this.chance = chance;
  }

  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  uuid: string;

  @Property()
  name: string;

  @Property()
  quantity: number;

  @Property({
    type: FloatType,
  })
  chance: number;

  @ManyToMany(() => User, (user) => user.rewards)
  users = new Collection<User>(this);
}
