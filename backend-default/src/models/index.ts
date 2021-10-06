import {
  Connection,
  Repository,
  ConnectionOptions,
  createConnection,
} from 'typeorm';
import umzug, { Storage } from 'umzug';
import fs from 'fs';
import { Demo } from './demo';

export * from './demo';

export let demoRepository: Repository<Demo>;

export const connect = async (opts: ConnectionOptions) => {
  const db = await createConnection({
    logging: false,
    synchronize: false,
    entities: [`${__dirname}/*.ts`],
    ...opts,
  });

  demoRepository = db.getRepository(Demo);

  return db;
};

class TypeOrmStorage implements Storage {
  checked: boolean;

  constructor(public db: Connection) {
    this.checked = false;
  }

  async checkTable() {
    if (this.checked) {
      return;
    }

    await this.db.query(
      'CREATE TABLE IF NOT EXISTS migrations (name VARCHAR(255) NOT NULL PRIMARY KEY)'
    );
    this.checked = true;
  }

  async logMigration(migrationName: string) {
    await this.checkTable();
    await this.db.query(
      `INSERT INTO migrations (name) values ('${migrationName}')`
    );
  }

  async unlogMigration(migrationName: string) {
    await this.checkTable();
    await this.db.query('DELETE FROM migrations WHERE name = $1', [
      migrationName,
    ]);
  }

  async executed() {
    await this.checkTable();

    const rows: { name: string }[] = await this.db.query(
      'SELECT name FROM migrations ORDER BY name'
    );

    return rows.map((row) => row.name);
  }
}

/**
 * Executa os scripts de migration em migrationPath na conexão db
 * Esta função considera 'migrations' apenas os arquivos em formato: *.SQL
 *
 * @param db Connection : A conexão utilizada
 * @param migrationPath Path : o Caminho da migração
 */
export const migrate = async (db: Connection, migrationPath: string) => {
  const START_BLOCK = '(START-BLOCK)';
  const END_BLOCK = '(END-BLOCK)';

  const u = new umzug({
    migrations: {
      path: migrationPath,
      pattern: /^\d+[\w-]+\.sql$/,
      customResolver: (sqlPath: string) => {
        return {
          up: async () => {
            console.log('[Migration] Processing path:', sqlPath);

            const commands = fs.readFileSync(sqlPath, 'utf8').split(';');
            await db.manager.transaction(async (manager) => {
              let sql = '';
              let isBlock = false;

              for (let i = 0; i < commands.length; i++) {
                const cmd = commands[i].trim();

                if (!cmd) {
                  continue;
                }

                // inside sql block
                if (isBlock) {
                  sql += cmd + ';';

                  if (cmd.includes(END_BLOCK)) {
                    await manager.query(sql);
                    sql = '';
                    isBlock = false;
                  }
                  continue;
                }

                // not inside  a block; just get the current command
                sql = cmd;

                // start of a sql block, dont execute it yet!
                if (cmd.includes(START_BLOCK)) {
                  isBlock = true;
                  sql += ';';
                  continue;
                }

                // single command scenario
                await manager.query(sql);
              }
            });
          },
        };
      },
    },
    storage: new TypeOrmStorage(db),
  });

  console.log('[Migration] Starting...');
  await u.up();
  console.log('[Migration] DB schema updated.');
};
