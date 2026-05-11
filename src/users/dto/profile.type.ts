import { ObjectType, Field, Float } from '@nestjs/graphql';
import { Role } from '../../auth/roles.enum';
import { OrderStatus } from '../../order/enums/order.enum';
import { PaymentMethod } from '../../order/enums/payment.enum';

// ✅ order item without circular refs
@ObjectType()
export class ProfileOrderItem {
  @Field()
  id!: string;

  @Field()
  quantity!: number;

  @Field(() => Float)
  price!: number;

  @Field(() => Float)
  subtotal!: number;

  @Field()
  productName!: string;
}

// ✅ order without user inside
@ObjectType()
export class ProfileOrder {
  @Field()
  id!: string;

  @Field(() => OrderStatus)
  status!: OrderStatus;

  @Field(() => Float)
  total_amount!: number;

  @Field(() => PaymentMethod)
  payment_method!: PaymentMethod;

  @Field()
  shipping_address!: string;

  @Field()
  order_date!: Date;

  @Field(() => [ProfileOrderItem], { nullable: true })
  order_items?: ProfileOrderItem[];
}

// ✅ full profile with orders — no loop
@ObjectType()
export class ProfileType {
  @Field()
  id!: string;

  @Field()
  username!: string;

  @Field()
  email!: string;

  @Field()
  role!: Role;

  @Field({ nullable: true })
  profilepic?: string;

  @Field(() => [ProfileOrder], { nullable: true })
  orders?: ProfileOrder[];
}