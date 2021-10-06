import { Connection } from 'typeorm';
import { server } from '../app';
import { connect } from '../models';
import { constants } from '../utils';

export let db: Connection;

beforeAll(async () => {
  process.env.JWT_KEY = 'JWT_KEY';
  constants();

  db = await connect({ type: 'sqlite', database: ':memory:' });
  server();
});

beforeEach(async () => {
  jest.clearAllMocks();
  await db.synchronize(true);
});

afterAll(async () => {
  await db.close();
});
