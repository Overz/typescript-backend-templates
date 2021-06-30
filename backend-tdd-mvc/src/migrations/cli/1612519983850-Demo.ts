import { MigrationInterface, QueryRunner, Table } from 'typeorm';

/**
 * Exemplo de criação de uma migration com a CLI do TypeORM.
 *
 * -n: nome
 * -d: diretório
 * Comando: npm run orm migration:create -- -n Demo -d $PWD/src/migrations
 *
 * Caso o DB esteja rodando, e queira executar as migrations,
 * execute: npm run orm migration:run
 *
 * Para remover execute: npm run orm migration:revert
 *
 * Para mais duvidas, apenas execute o comando `npm run orm`,
 * e verá uma lista de comandos disponíveis.
 *
 * Ou consulte a documentação:
 * https://typeorm.io/#/migrations/running-and-reverting-migrations
 */
export class Demo1612519983850 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'demo',
        columns: [
          {
            name: 'cddemo',
            type: 'integer',
            unsigned: true,
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'nmnome',
            type: 'varchar',
            isNullable: false,
            length: '255',
            charset: 'utf-8',
          },
          {
            name: 'dedescricao',
            type: 'varchar',
            isNullable: true,
            length: '1000',
            charset: 'utf-8',
            default: 'Nothing described',
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('demo');
  }
}
