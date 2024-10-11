import {
  Entity,
  Property,
  EventArgs,
  PrimaryKey,
  BeforeCreate,
} from '@mikro-orm/core';
import { hash } from 'bcrypt';

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

  @Property()
  username!: string;

  @Property({ hidden: true })
  password!: string;

  @BeforeCreate()
  async onBeforeCreate(args: EventArgs<this>) {
    const salt = parseInt(process.env.BCRYPT_SALT);

    if (!salt) {
      throw new Error('BCRYPT_SALT is invalid!');
    }

    args.entity.password = await hash(args.entity.password, salt);
  }
}
