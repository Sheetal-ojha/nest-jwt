import { InputType, Field } from '@nestjs/graphql';
import { isNotEmpty, IsNotEmpty, MinLength } from 'class-validator';
import { Role } from '../roles.enum';

@InputType()
export class LoginInput {
  @Field()
  @IsNotEmpty({ message: 'Username is required' })
  username!: string;

  @Field()
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  password!: string;

  @Field()
  @IsNotEmpty()
  Role!: string;
}