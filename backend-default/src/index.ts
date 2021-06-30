import { Connection } from 'typeorm';
import { get } from 'env-var';
import { connect, migrate } from './models';
import { app, init } from './app';
import { config } from 'dotenv';
import { resolve } from 'path';
import { DB_URL, constants } from './utils';

let db: Connection;

const start = async () => {
  config({ path: resolve(__dirname, '..', '.env') });

  const PORT = get('PORT').default(3000).asPortNumber();

  try {
    console.log('[ENVIRONMENT] Getting environments...');
    constants();
  } catch (err) {
    exit('[ENVIRONMENT] Error getting environments!', err);
  }

  try {
    // estabelece uma conexao com o banco
    console.log('[CONNECTION] Connecting...');
    db = await connect({
      type: 'postgres',
      url: DB_URL,
      migrationsTableName: 'migrations',
    });

    await migrate(db, `${__dirname}/migrations`);
  } catch (err) {
    exit('[CONNECTION] Error connecting or running migrations!', err);
  }

  try {
    init();

    // inicia o servidor http
    app.listen(PORT, () => {
      console.log(`[APP] BACKEND listening on port ${PORT}`);
    });
  } catch (error) {
    exit('[APP] Error starting application!', error);
  }
};

const finish = async () => {
  console.log('[APP] Cleaning up...');
  if (db) {
    await db.close();
  }

  // obs: necessário para matar todos os processos filhos,
  // senao o ts-node-dev nao consegue reiniciar nunca
  process.exit();
};

const exit = (msg: string, err: any) => {
  console.error(msg, '\n', err);
  process.exit(1);
};

process.on('SIGINT', finish);
process.on('SIGTERM', finish);

start();
