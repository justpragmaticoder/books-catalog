import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  ManyToMany,
} from 'typeorm';
import Author from './author.entity';
import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
@Entity({name: 'books', orderBy: { id: 'ASC'}})
@Unique(['title'])
export default class Book {
  constructor(title: string) {
    this.title = title;
  }

  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String, { nullable: true })
  @Column()
  title: string;

  @Field(() => [Author])
  authors: Author[];

  @ManyToMany(
    () => Author,
    author => author.booksConnection,
  )
  authorsConnection: Author[];
}
