import { InputType, Field } from '@nestjs/graphql';
import { IsEnum, isNotEmpty, IsNotEmpty, MinLength } from 'class-validator';
import { Role } from '../roles.enum';

@InputType()
export class LoginInput {
  @Field()
  @IsNotEmpty({ message: ' required' })
  email!: string;

  @Field()
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  password!: string;

  // @Field(() => Role, { nullable: true })
  //  @IsEnum(Role, { message: 'Role must be either admin or user' })
  //  role?: Role;
 }