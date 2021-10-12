import { Connection } from 'typeorm';
import { server } from '../app';
import { connect } from '../models';
import { constants } from '../utils';

export let db: Connection;

beforeAll(async () => {
  setTestEnvs();
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

const setTestEnvs = () => {
  process.env.JWT_KEY = 'JWT_KEY';
};
