// order-item.entity.ts
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { ProductEntity } from '../product/product.entity';
// import { Order } from './order.entity';
import { Field, ObjectType, Int, Float } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class OrderItem {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  // @ManyToOne(() => Order, (order) => order.items)
  // order!: Order;

  @ManyToOne(() => ProductEntity)
  @Field(() => ProductEntity)
  product!: ProductEntity;

  @Field(() => Int)
  @Column()
  quantity!: number;

  @Field(() => Float)
  @Column()
  price!: number;
}