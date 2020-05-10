import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import RepoModule from './repo.module';
import { GraphQLModule } from '@nestjs/graphql';
import AuthorResolver from './resolvers/author.resolver';
import BookResolver from './resolvers/book.resolver';
import * as depthLimit from 'graphql-depth-limit';
import {
  authorBooksLoader,
  bookAuthorsLoader,
} from './db/loaders/books-authors.loader';

const graphQLImports = [BookResolver, AuthorResolver];

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    RepoModule,
    ...graphQLImports,
    GraphQLModule.forRoot({
      path: '/playground',
      autoSchemaFile: 'schema.gql',
      playground: true,
      context: {
        bookAuthorsLoader: bookAuthorsLoader(),
        authorBooksLoader: authorBooksLoader(),
      },
      validationRules: [
        depthLimit(5),
      ],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
