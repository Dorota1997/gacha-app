import { Migration } from '@mikro-orm/migrations';

export class Migration20241011110823 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "users" ("uuid" uuid not null default gen_random_uuid(), "username" varchar(255) not null, "password" varchar(255) not null, constraint "users_pkey" primary key ("uuid"));`);
  }

}
