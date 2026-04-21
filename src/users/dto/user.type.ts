import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Role } from '../../auth/roles.enum';

@ObjectType()
export class UserType {
  @Field(() => Int)
  id!: number;

  @Field()
  username!: string;

  @Field()
  email!: string;

  @Field(() => Role)
role!: Role;
}