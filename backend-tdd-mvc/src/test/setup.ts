import { Connection } from 'typeorm';
import { connect } from '../models';

export let db: Connection;

beforeAll(async () => {
  db = await connect({ type: 'sqlite', database: ':memory:' });
});

beforeEach(async () => {
  jest.clearAllMocks();
  await db.synchronize(true);
});

afterAll(async () => {
  await db.close();
});
