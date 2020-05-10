import {
  bookAuthorsLoader,
  authorBooksLoader,
} from '../db/loaders/books-authors.loader';

export interface IGraphQLContext {
  bookAuthorsLoader: ReturnType<typeof bookAuthorsLoader>;
  authorBooksLoader: ReturnType<typeof authorBooksLoader>;
}
