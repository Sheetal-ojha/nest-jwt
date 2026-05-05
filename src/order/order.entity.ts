import { ObjectType, Field, Float, registerEnumType } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from '../users/user.entity';
import { OrderItem } from './order-item.entity';

export enum OrderStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
}

export enum PaymentMethod {
  CASH_ON_DELIVERY = 'CASH_ON_DELIVERY',
  CREDIT_CARD = 'CREDIT_CARD',
  ESEWA = 'ESEWA',
  KHALTI = 'KHALTI',
}

registerEnumType(OrderStatus, { name: 'OrderStatus' });
registerEnumType(PaymentMethod, { name: 'PaymentMethod' });

@ObjectType()
@Entity()
export class Order {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Field()
  @CreateDateColumn()
  order_date!: Date;

  @Field(() => Float)
  @Column('float', { default: 0 })
  total_amount!: number;

  @Field(() => OrderStatus)
  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.PENDING })
  status!: OrderStatus;

  @Field()
  @Column()
  shipping_address!: string;

  @Field(() => PaymentMethod)
  @Column({ type: 'enum', enum: PaymentMethod, default: PaymentMethod.CASH_ON_DELIVERY })
  payment_method!: PaymentMethod;

  @Field()
  @CreateDateColumn()
  created_at!: Date;

  @Field()
  @UpdateDateColumn()
  updated_at!: Date;

  @ManyToOne(() => UserEntity, (user) => user.orders, { eager: true })
  @JoinColumn()
  @Field(() => UserEntity)
  user!: UserEntity;

  @OneToMany(() => OrderItem, (item: OrderItem) => item.order, {
    cascade: true,
    eager: true,
  })
  @Field(() => [OrderItem])
  order_items!: OrderItem[];
}