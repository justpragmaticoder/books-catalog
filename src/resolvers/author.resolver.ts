import {
  Args,
  Context,
  Mutation,
  Parent,
  Query,
  ResolveProperty,
  Resolver,
} from '@nestjs/graphql';
import RepoService from '../repo.service';
import Author from '../db/models/author.entity';
import AuthorInput from './input/author.input';
import { ID, Int } from 'type-graphql';
import { IGraphQLContext } from '../types/graphql.types';
import Book from '../db/models/book.entity';
import { getConnection, SelectQueryBuilder } from 'typeorm';
import { EntityManager } from 'typeorm/entity-manager/EntityManager';

@Resolver(() => Author)
class AuthorResolver {
  constructor(private readonly repoService: RepoService) {}

  private async _getAuthorById(
    entityManager: EntityManager,
    id: number,
  ): Promise<Author> {
    return entityManager
      .createQueryBuilder(Author, 'author')
      .leftJoinAndSelect('author.booksConnection', 'books')
      .where('author.id = :id', { id })
      .getOne();
  }

  @Query(() => Author, { nullable: true })
  public async getAuthor(
    @Args({ name: 'id', type: () => ID }) id: number,
  ): Promise<Author> {
    return this.repoService.authorRepo.findOne({ where: { id } });
  }

  @Query(() => [Author])
  public async getAuthors(
    @Args({ name: 'minNumberOfBooks', type: () => Int, nullable: true })
    minNumberOfBooks: number,
    @Args({ name: 'maxNumberOfBooks', type: () => Int, nullable: true })
    maxNumberOfBooks: number,
  ): Promise<Author[]> {
    if (minNumberOfBooks || maxNumberOfBooks) {
      let havingCondition: string = '';

      if (minNumberOfBooks) {
        havingCondition += `count(bookId) >= ${minNumberOfBooks}`;
      }
      if (maxNumberOfBooks) {
        const logicalOperator: string = havingCondition.length ? ' AND ' : ' ';
        havingCondition += `${logicalOperator}${'count(bookId) <= ' +
          maxNumberOfBooks}`;
      }

      return await this.repoService.authorRepo
        .createQueryBuilder('author')
        .leftJoinAndSelect('books_authors', 'ba', 'ba.authorId = id')
        .where((qb: SelectQueryBuilder<Author>) => {
          const subQuery: string = qb
            .subQuery()
            .select('authorId as id')
            .from('books_authors', 'ba')
            .groupBy('authorId')
            .having(havingCondition)
            .getQuery();

          return `id IN (${subQuery})`;
        })
        .orderBy('id')
        .getMany();
    }

    return this.repoService.authorRepo.find();
  }

  @Mutation(() => Author)
  public async createAuthor(
    @Args('author') input: AuthorInput,
  ): Promise<Author> {
    return this.repoService.authorRepo.save({
      firstName: input.firstName,
      lastName: input.lastName,
    });
  }

  @Mutation(() => Book)
  public async addAuthor(
    @Args({ name: 'bookId', type: () => ID }) bookId: number,
    @Args({ name: 'authorId', type: () => ID }) authorId: number,
  ): Promise<Book> {
    return await getConnection().transaction(
      async (entityManager: EntityManager) => {
        const book: Book = await entityManager.findOne(Book, bookId);

        if (!book) {
          throw new Error(`Book with id ${bookId} does not exist`);
        }

        await entityManager
          .createQueryBuilder()
          .relation(Book, 'authorsConnection')
          .of(book)
          .add(authorId);

        return book;
      },
    );
  }

  @Mutation(() => Int)
  public async deleteAuthor(
    @Args({ name: 'id', type: () => ID }) id: number,
  ): Promise<number> {
    return await getConnection().transaction(
      async (entityManager: EntityManager) => {
        let affected: number = 0;
        const author: Author = await this._getAuthorById(entityManager, id);

        if (author) {
          /* Unbind author from books */
          await this.repoService.authorRepo
            .createQueryBuilder()
            .relation(Author, 'booksConnection')
            .of(author)
            .remove(author.booksConnection);
          affected += (await this.repoService.authorRepo.delete(id)).affected;
        }

        return affected;
      },
    );
  }

  @Mutation(() => Int)
  public async deleteAuthorWithBooks(
    @Args({ name: 'id', type: () => ID }) id: number,
  ): Promise<number> {
    return await getConnection().transaction(
      async (entityManager: EntityManager) => {
        let affectedTotal: number = 0;
        const author: Author = await this._getAuthorById(entityManager, id);

        if (author) {
          /* Books with only specified author */
          const booksIds: Book[] = await entityManager
            .createQueryBuilder(Book, 'books')
            .leftJoin('books_authors', 'ba', 'ba.bookId = id')
            .where((qb: SelectQueryBuilder<Author>) => {
              const subQuery: string = qb
                .subQuery()
                .select('bookId as id')
                .from('books_authors', 'ba')
                .groupBy('bookId')
                .having('count(authorId) = 1')
                .getQuery();

              return `id IN (${subQuery})`;
            })
            .orderBy('id')
            .getMany();

          /* Delete books with only specific author */
          affectedTotal += (await entityManager.delete(Book, booksIds))
            .affected;
          affectedTotal += author.booksConnection.length;

          /* Unbind books with coauthors from this author */
          await entityManager
            .createQueryBuilder()
            .relation(Author, 'booksConnection')
            .of(author)
            .remove(author.booksConnection);

          affectedTotal += (await entityManager.delete(Author, id)).affected;
        }

        return affectedTotal;
      },
    );
  }

  @ResolveProperty('books', () => [Book])
  public async books(
    @Parent() parent,
    @Context() { authorBooksLoader }: IGraphQLContext,
  ): Promise<Book[]> {
    return authorBooksLoader.load(parent.id);
  }
}
export default AuthorResolver;
