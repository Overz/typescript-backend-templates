const NODE_ENV = process.env.NODE_ENV !== 'test';

export const envRequired = NODE_ENV && !process.env.TS_NODE_DEV;
