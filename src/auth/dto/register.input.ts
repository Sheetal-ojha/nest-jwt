import { InputType, Field, Int } from '@nestjs/graphql';
import {
  IsEmail,
  MinLength,
  Matches,
  IsEnum,
  IS_ENUM,
  isEnum,
} from 'class-validator';
import { IsNotEmpty } from 'class-validator';
import { Role } from '../roles.enum';



@InputType()
export class RegisterInput {

  
  @Field()
  @IsNotEmpty({ message: 'Username is required' })
  username!: string;

  @Field()
  @IsEmail({}, { message: 'Invalid email format' })
  email!: string;

  @Field()
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  @Matches(/^(?=.*[A-Z])(?=.*[0-9])/, {
    message: 'Password must contain at least 1 number and 1 uppercase letter',
  })
  password!: string;

  @Field(() => Role, { nullable: true })
  @IsEnum(Role, { message: 'Role must be either admin or user' })
  role?: Role;
}
