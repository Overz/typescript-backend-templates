import { ConnectionOptions } from 'typeorm';

const isDev = process.env.NODE_ENV !== 'test' && !process.env.TS_NODE_DEV;

export default (): ConnectionOptions => ({
  type: 'postgres',
  host: isDev ? 'localhost' : 'postgres-srv',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  synchronize: false,
  logging: false,
  entities: isDev ? ['src/models/*.ts'] : ['build/models/*.js'],
  migrations: isDev
    ? ['src/migrations/cli/*.ts']
    : ['build/migrations/cli/*.js'],
  migrationsTableName: 'migrations',
  cli: {
    entitiesDir: isDev ? 'src/models' : 'build/models',
    migrationsDir: isDev ? 'src/migrations/cli' : 'build/migrations/cli',
  },
  poolErrorHandler: (err) => {
    if (err) {
      console.error('[POSTGRES] Pool connection error!', err);
    }
  },
  ssl: isDev,
});
