import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsEmail, MinLength } from 'class-validator';

@InputType()
export class ResetPasswordInput {
  @IsEmail()
  @Field()
  email!: string;

  @IsString()
  @MinLength(6)
  @Field()
  newPassword!: string;
}