import { InputType, Field, Float, Int, ID } from '@nestjs/graphql';

@InputType()
export class UpdateProductInput {
  @Field(() =>String,{ nullable: true })
  name?: string;

//   @Field()
// id!:number;

  @Field(() => Float, { nullable: true })
  price?: number;

  @Field(() =>String,{ nullable: true })
  description?: string;

    @Field(() =>String,{ nullable: true })
  image?: string; 
}