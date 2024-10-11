import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({
  tableName: 'users',
})
export class User {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  uuid: string;

  @Property()
  username!: string;

  @Property()
  password!: string;
}
