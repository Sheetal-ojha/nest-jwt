import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Role } from '../../auth/roles.enum';
import { PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
export class UserType {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id!: string;

  @Field()
  username!: string;

  @Field()
  email!: string;

  @Field(() => Role)
role!: Role;
}
