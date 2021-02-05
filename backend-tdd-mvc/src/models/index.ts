import { createConnection, ConnectionOptions, Repository } from 'typeorm';
import { Demo } from './demo';

export * from './demo';

export let demoRepository: Repository<Demo>;

export const connect = async (options: ConnectionOptions) => {
  const db = await createConnection({
    logging: false,
    synchronize: false,
    migrationsTableName: 'unused_migrations',
    entities: [`${__dirname}/*.ts`],
    ...options,
  });

  demoRepository = db.getRepository(Demo);

  return db;
};
