import { get } from 'env-var';

export const NODE_ENV = process.env.NODE_ENV;
export const required = NODE_ENV !== 'test' && !process.env.TS_NODE_DEV;

export let JWT_KEY = '',
  DB_URL = '';

export const constants = () => {
  JWT_KEY = get('JWT_KEY').required(required).asString();
  DB_URL = get('DB_URL').required(required).asString();
};
