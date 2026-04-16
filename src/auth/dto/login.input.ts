import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, MinLength } from 'class-validator';

@InputType()
export class LoginInput {
  @Field()
  @IsNotEmpty({ message: 'Username is required' })
  username!: string;

  @Field()
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  password!: string;
}