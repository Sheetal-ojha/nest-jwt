import { Field, ObjectType } from '@nestjs/graphql';
import { Entity,  PrimaryGeneratedColumn, Column } from 'typeorm';
import { Role } from '../auth/roles.enum';
import { OneToMany } from 'typeorm';
import { UUID } from 'typeorm/driver/mongodb/bson.typings.js';


import { Order } from '../order/order.entity';
// import { Order } from '../order/order.entity';



@ObjectType()
@Entity()
export class UserEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Field()
  @Column()
  username!: string;

  @Field()
  @Column()
  email!: string;

  @Column()
  password!: string;
@Field()
  @Column({
  type: 'enum',
  enum: Role,
  default: Role.USER,
})
role!: Role;
// inside UserEntity class add:
@OneToMany(() => Order, (order) => order.user)
@Field(() => [Order], { nullable: true })
orders?: Order[];
}