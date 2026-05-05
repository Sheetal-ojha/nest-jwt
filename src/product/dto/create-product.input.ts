import { InputType,Field, Int } from "@nestjs/graphql";


@InputType()
export class CreateProductInput {
  @Field()
  name!: string;

  @Field()
  price!: number;

  @Field()
  description!: string;

   @Field({ nullable: true })
  image?: string;

   @Field(() => Int, { defaultValue: 0 })
  quantity!: number;
} 