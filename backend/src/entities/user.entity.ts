import {
  Entity,
  Property,
  EventArgs,
  PrimaryKey,
  BeforeCreate,
  ManyToOne,
  ManyToMany,
  Collection,
} from '@mikro-orm/core';
import { hash } from 'bcrypt';
import { Role } from './role.entity';
import { Reward } from './reward.entity';

@Entity({
  tableName: 'users',
})
export class User {
  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }

  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  uuid: string;

  @Property({ unique: true })
  username!: string;

  @Property({ hidden: true })
  password!: string;

  @Property({ default: 0 })
  tickets: number;

  @Property({ default: 0 })
  points: number;

  @ManyToMany(() => Reward, 'users', { owner: true })
  rewards = new Collection<Reward>(this);

  @ManyToOne()
  role!: Role;

  @BeforeCreate()
  async onBeforeCreate(args: EventArgs<this>) {
    const salt = parseInt(process.env.BCRYPT_SALT);

    if (!salt) {
      throw new Error('BCRYPT_SALT is invalid!');
    }

    args.entity.password = await hash(args.entity.password, salt);
  }
}
