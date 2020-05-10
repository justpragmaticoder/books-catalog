import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateBookAuthor1563360272383 implements MigrationInterface {
  private bookAuthorTable = new Table({
    name: 'books_authors',
    columns: [
      {
        name: 'bookId',
        type: 'INTEGER',
        isPrimary: true,
        isNullable: false,
      },
      {
        name: 'authorId',
        type: 'INTEGER',
        isPrimary: true,
        isNullable: false,
      },
    ],
  });

  private bookForeignKey = new TableForeignKey({
    columnNames: ['bookId'],
    referencedColumnNames: ['id'],
    onDelete: 'CASCADE',
    referencedTableName: 'books',
  });
  private authorForeignKey = new TableForeignKey({
    columnNames: ['authorId'],
    referencedColumnNames: ['id'],
    onDelete: 'CASCADE',
    referencedTableName: 'authors',
  });

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(this.bookAuthorTable);
    await queryRunner.createForeignKey('books_authors', this.bookForeignKey);
    await queryRunner.createForeignKey('books_authors', this.authorForeignKey);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable(this.bookAuthorTable);
  }
}
