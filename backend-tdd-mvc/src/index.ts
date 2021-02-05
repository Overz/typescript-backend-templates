import { Connection } from 'typeorm';
import * as env from 'env-var';
import { connect } from './models';
import { app } from './app';
import { Indexable } from './utils/types/indexable';

const port = env.get('PORT').default('3000').asPortNumber();

let db: Connection;

const start = async () => {
  let DB_URL = '';
  try {
    DB_URL = env.get('DB_URL').required(true).asString();
    env.get('JWT_KEY').required(true);
  } catch (err) {
    exit('[ENVIRONMENT] Error getting environments!', err);
  }

  try {
    // estabelece uma conexao com o banco
    console.log('[Connection] Connecting...');
    db = await connect({
      type: 'postgres',
      url: DB_URL,
    });
  } catch (err) {
    exit('[Connection] Error connecting or running migrations!', err);
  }

  try {
    // inicia o servidor http
    app.listen(port, () => {
      console.log(`DETAILS listening on port ${port}`);
    });
  } catch (error) {
    exit('[APP] Error starting application!', error);
  }
};

// finaliza a aplicação se houver qualquer erro
const exit = (message: string, error: Indexable) => {
  console.error(message, '\n', error);
  process.exit(1);
};

const finish = async () => {
  console.log('Cleaning up...');
  if (db) {
    await db.close();
  }

  // obs: necessário para matar todos os processos filhos,
  // senao o ts-node-dev nao consegue reiniciar nunca
  process.exit();
};

process.on('SIGINT', finish);
process.on('SIGTERM', finish);

start();
