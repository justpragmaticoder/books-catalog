import { Field, ID, ObjectType } from 'type-graphql';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import Book from './book.entity';

@ObjectType()
@Entity({ name: 'authors', orderBy: { id: 'ASC' } })
@Entity({ name: 'authors' })
@Unique(['firstName', 'lastName'])
export default class Author {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column()
  firstName: string;

  @Field(() => String)
  @Column()
  lastName: string;

  @Field(() => [Book])
  books: Book[];

  @ManyToMany(
    () => Book,
    book => book.authorsConnection,
  )
  @JoinTable({
    name: 'books_authors',
    joinColumn: { name: 'authorId' },
    inverseJoinColumn: { name: 'bookId' },
  })
  booksConnection: Book[];
}
