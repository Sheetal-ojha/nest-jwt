import { InputType, Field, Int, Float } from '@nestjs/graphql';
import { IsString, IsEnum, IsArray, ValidateNested, IsNumber, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';
import { PaymentMethod } from '../order.entity';

@InputType()
export class OrderItemInput {
  @IsUUID()
  @Field()
  product_id!: string;

  @IsNumber()
  @Field(() => Int)
  quantity!: number;

  // @IsNumber()
  // @Field(() => Float)
  // price!: number;
}

@InputType()
export class CreateOrderInput {
  @IsString()
  @Field()
  shipping_address!: string;

  @IsEnum(PaymentMethod)
  @Field(() => PaymentMethod)
  payment_method!: PaymentMethod;

  @IsArray()
  @ValidateNested({ each: true }) 
  @Type(() => OrderItemInput)
    @Field(() => [OrderItemInput])     
  order_items!: OrderItemInput[];
}