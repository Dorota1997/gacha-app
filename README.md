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

### PostgreSQL

```
> psql gacha_db root

\c DBNAME    - switch database
\dt          - list tables
\d TABLENAME - table schema
```

### Resources

- [NestJS docs](https://docs.nestjs.com/techniques/configuration)
- [MikroORM docs](https://mikro-orm.io/)
- [NestJS project structure](https://github.com/CatsMiaow/nestjs-project-structure)
- [NestJS + MikroORM realworld example](https://github.com/mikro-orm/nestjs-realworld-example-app)
