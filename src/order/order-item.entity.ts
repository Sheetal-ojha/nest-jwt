import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Order } from './order.entity';
import { ProductEntity } from '../product/product.entity';

@ObjectType()
@Entity()
export class OrderItem {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Order, (order) => order.order_items, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  order!: Order;

  @ManyToOne(() => ProductEntity, { eager: true })
  @JoinColumn()
  @Field(() => ProductEntity)
  product!: ProductEntity;

  @Field(() => Int)
  @Column()
  quantity!: number;

  @Field(() => Float)
  @Column('float')
  price!: number;

  @Field(() => Float)
  @Column('float')
  subtotal!: number;
}