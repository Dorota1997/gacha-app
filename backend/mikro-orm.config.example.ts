import { SeedManager } from '@mikro-orm/seeder';
import { Migrator } from '@mikro-orm/migrations';
import { defineConfig } from '@mikro-orm/postgresql';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';

export default defineConfig({
  host: 'localhost',
  port: 5432,
  user: 'root',
  password: '1234',
  dbName: 'gacha_db',
  entities: ['./dist/**/*.entity.js'],
  entitiesTs: ['./src/**/*.entity.ts'],
  debug: false,
  highlighter: new SqlHighlighter(),
  metadataProvider: TsMorphMetadataProvider,
  extensions: [Migrator, SeedManager],
});
