# Gacha app

Users gather points to be able to roll prizes from gacha. Crafted with NestJS and newest version of Angular.

### Quick start

1. Install dependencies.
2. Create `.env` from `.env.example`.
3. Create `mikro-orm.config.ts` from [example](./backend/mikro-orm.config.example.ts).
4. Run `npm run docker:up`.
5. Run migrations & seeders.

   ```
   npm run db:migration:sync
   npm run db:seed:dev
   ```

6. Start backend & frontend.

### FAQ

- How to enable HMR (Hot Module Reload) in `backend`?

  Use `npm run start:dev` that has `--watch` flag. If you want to use webpack HMR please note that it's not compatible with `TsMorphMetadataProvider`

- How can I reset database?

  Execute `npm run db:reset` script followed by `npm run db:seed:dev`

- How can I register another alias in `backend`?

  You need to put it in `paths` section in [tsconfig.json](./backend/tsconfig.json) and then reflect it in [package.json](./backend/package.json) under `_moduleAliases`

- How do I view PostgreSQL data?

  First, access PostgreSQL service by using `docker exec` or `Docker Desktop`. Afterwards refer to cheatsheet below:

  ```
  > psql gacha_db root

  \c DBNAME    - switch database
  \dt          - list tables
  \d TABLENAME - table schema

  PS: when you see `DB_NAME=# ` in terminal, you can also use SQL commands supported by PostgreSQL
  ```

### Resources

- [NestJS docs](https://docs.nestjs.com/techniques/configuration)
- [MikroORM docs](https://mikro-orm.io/)
- [NestJS project structure](https://github.com/CatsMiaow/nestjs-project-structure)
- [NestJS + MikroORM realworld example](https://github.com/mikro-orm/nestjs-realworld-example-app)
