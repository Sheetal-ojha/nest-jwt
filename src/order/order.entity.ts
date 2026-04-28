// // order.entity.ts
// import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
// import { UserEntity } from '../users/user.entity';
// import { OrderItem } from './order-item.entity';
// import { Field, ObjectType, Int } from '@nestjs/graphql';

// @ObjectType()
// @Entity()
// export class Order {
//   @Field(() => Int)
//   @PrimaryGeneratedColumn()
//   id!: number;

// @ManyToOne(() => UserEntity, (user) => user.orders) 
// @Field(() => UserEntity)
// user!: UserEntity;

//   @OneToMany(() => OrderItem, (item) => item.order,  { nullable:true, cascade: true })
//   @Field(() => [OrderItem])
//   items!: OrderItem[];
// }