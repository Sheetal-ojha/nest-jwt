import { InputType, Field, Float, Int } from '@nestjs/graphql';
import { IsOptional, IsString, IsNumber, isNumber } from 'class-validator';

@InputType()
export class UpdateProductInput {
  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  name?: string;




    @IsOptional()
    @IsNumber()
  @Field(() => Float, { nullable: true })
  price?: number;




    @IsOptional()
     @IsString()
  @Field({ nullable: true })
  description?: string;



    @IsOptional()
    @IsString()
  @Field({ nullable: true })
  image?: string;



@IsOptional()
@IsNumber()
  @Field(() => Int, { nullable: true })
  quantity?: number;

}