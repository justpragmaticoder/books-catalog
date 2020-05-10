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
import Book from '../db/models/book.entity';
import BookInput from './input/book.input';
import { ID, Int } from 'type-graphql';
import { getConnection, Like } from 'typeorm';
import { IGraphQLContext } from '../types/graphql.types';
import { EntityManager } from 'typeorm/entity-manager/EntityManager';

@Resolver(() => Book)
class BookResolver {
  constructor(private readonly repoService: RepoService) {}

  @Query(() => Book, { nullable: true })
  public async getBook(
    @Args({ name: 'id', type: () => ID }) id: number,
  ): Promise<Book> {
    return this.repoService.bookRepo.findOne({ where: { id } });
  }

  @Query(() => [Book], { nullable: true })
  public async getBooks(
    @Args({ name: 'title', type: () => String }) title: string,
  ): Promise<Book[]> {
    return this.repoService.bookRepo.find({ where: { title: Like(title) } });
  }

  @Mutation(() => Book)
  public async createBook(
    @Args({ name: 'book', type: () => BookInput }) input: BookInput,
  ): Promise<Book> {
    return await getConnection().transaction(
      async (entityManager: EntityManager) => {
        const book = new Book(input.title);
        const resultBook = await entityManager.save(book);

        await entityManager
          .createQueryBuilder()
          .relation(Book, 'authorsConnection')
          .of(resultBook)
          .add(input.authorIds);

        return resultBook;
      },
    );
  }

  @Mutation(() => Int)
  public async deleteBook(
    @Args({ name: 'id', type: () => ID }) id: number,
  ): Promise<number> {
    return await getConnection().transaction(
      async (entityManager: EntityManager) => {
        const book: Book = await entityManager
          .createQueryBuilder(Book, 'book')
          .leftJoinAndSelect('book.authorsConnection', 'authors')
          .where('book.id = :id', { id })
          .getOne();

        if (!book) {
          throw new Error(`There is no book with id:${id}`);
        }

        /* Unbind book from authors */
        await entityManager
          .createQueryBuilder()
          .relation(Book, 'authorsConnection')
          .of(book)
          .remove(book.authorsConnection);
        return (await entityManager.delete(Book, id)).affected;
      },
    );
  }

  @ResolveProperty('authors', () => [Author], { nullable: true })
  public async authors(
    @Parent() parent,
    @Context() { bookAuthorsLoader }: IGraphQLContext,
  ): Promise<Author[]> {
    return bookAuthorsLoader.load(parent.id);
  }
}

export default BookResolver;
