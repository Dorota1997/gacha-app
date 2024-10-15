import { Migration } from '@mikro-orm/migrations';

export class Migration20241015133610 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "rewards" ("uuid" uuid not null default gen_random_uuid(), "name" varchar(255) not null, "quantity" int not null, "chance" real not null, constraint "rewards_pkey" primary key ("uuid"));`);

    this.addSql(`create table "roles" ("uuid" uuid not null default gen_random_uuid(), "name" text check ("name" in ('Admin', 'Member')) not null, constraint "roles_pkey" primary key ("uuid"));`);

    this.addSql(`create table "users_rewards" ("user_uuid" uuid not null, "reward_uuid" uuid not null, constraint "users_rewards_pkey" primary key ("user_uuid", "reward_uuid"));`);

    this.addSql(`alter table "users_rewards" add constraint "users_rewards_user_uuid_foreign" foreign key ("user_uuid") references "users" ("uuid") on update cascade on delete cascade;`);
    this.addSql(`alter table "users_rewards" add constraint "users_rewards_reward_uuid_foreign" foreign key ("reward_uuid") references "rewards" ("uuid") on update cascade on delete cascade;`);

    this.addSql(`alter table "users" add column "tickets" int not null default 0, add column "points" int not null default 0, add column "role_uuid" uuid not null;`);
    this.addSql(`alter table "users" add constraint "users_role_uuid_foreign" foreign key ("role_uuid") references "roles" ("uuid") on update cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "users_rewards" drop constraint "users_rewards_reward_uuid_foreign";`);

    this.addSql(`alter table "users" drop constraint "users_role_uuid_foreign";`);

    this.addSql(`drop table if exists "rewards" cascade;`);

    this.addSql(`drop table if exists "roles" cascade;`);

    this.addSql(`drop table if exists "users_rewards" cascade;`);

    this.addSql(`alter table "users" drop column "tickets", drop column "points", drop column "role_uuid";`);
  }

}
