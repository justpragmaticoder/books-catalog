import { Field, InputType } from 'type-graphql';

@InputType()
class AuthorInput {
  @Field(() => String)
  readonly firstName: string;

  @Field(() => String)
  readonly lastName: string;
}

export default AuthorInput;
