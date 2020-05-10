import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class CreateAuthor1563360242539 implements MigrationInterface {
  private authorTable = new Table({
    name: 'authors',
    columns: [
      {
        name: 'id',
        type: 'INTEGER',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'increment',
      },
      {
        name: 'firstName',
        type: 'varchar',
        length: '255',
        isNullable: false,
      },
      {
        name: 'lastName',
        type: 'varchar',
        length: '255',
        isNullable: false,
      },
    ],
  });
  private uniqueIndex = new TableIndex({
    columnNames: ['firstName', 'lastName'],
    isUnique: true,
  });

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(this.authorTable);
    await queryRunner.createIndex('authors', this.uniqueIndex);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable(this.authorTable);
  }
}
