import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateBook1563360267250 implements MigrationInterface {
  private bookTable = new Table({
    name: 'books',
    columns: [
      {
        name: 'id',
        type: 'INTEGER',
        isPrimary: true,
        isUnique: true,
        isGenerated: true,
        generationStrategy: 'increment',
      },
      {
        name: 'title',
        isUnique: true,
        type: 'varchar',
        length: '255',
        isNullable: false,
      },
    ],
  });

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(this.bookTable);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable(this.bookTable);
  }
}
