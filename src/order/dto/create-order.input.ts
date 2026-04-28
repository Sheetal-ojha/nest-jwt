
import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateOrderItemInput {
  @Field(() => Int)
  productId!: number;

  @Field(() => Int)
  quantity!: number;
}

@InputType()
export class CreateOrderInput {
  @Field(() => [CreateOrderItemInput])
  items!: CreateOrderItemInput[];
}