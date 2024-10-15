import { Migration } from '@mikro-orm/migrations';

export class Migration20241015143218 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "users" add constraint "users_username_unique" unique ("username");`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "users" drop constraint "users_username_unique";`);
  }

}
