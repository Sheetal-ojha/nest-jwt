import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class AuthResponse {
  @Field()
  id!: number;

  @Field()
  username!: string;

  @Field()
  access_token!: string;
}