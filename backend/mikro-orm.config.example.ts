import 'dotenv/config';
import 'module-alias/register';

import { SeedManager } from '@mikro-orm/seeder';
import { Migrator } from '@mikro-orm/migrations';
import { defineConfig } from '@mikro-orm/postgresql';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';

export default defineConfig({
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT),
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  dbName: process.env.POSTGRES_DATABASE,
  entities: ['./dist/**/*.entity.js'],
  entitiesTs: ['./src/**/*.entity.ts'],
  debug: true,
  highlighter: new SqlHighlighter(),
  // @NOTE TsMorphMetadataProvider is not compatible with webpack
  metadataProvider: TsMorphMetadataProvider,
  extensions: [Migrator, SeedManager],
  discovery: {
    disableDynamicFileAccess: false,
  },
});
