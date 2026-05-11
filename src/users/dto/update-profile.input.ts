import { InputType, Field } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateProfileInput {
  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  username?: string;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  profilepic?: string;
}