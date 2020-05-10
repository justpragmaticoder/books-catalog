import { Field, ID, InputType } from 'type-graphql';

@InputType()
class BookInput {
  @Field(() => String)
  readonly title: string;

  @Field(() => [ID])
  readonly authorIds: number[];
}

export default BookInput;
