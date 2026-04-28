import { Field, ObjectType } from '@nestjs/graphql';
import { Entity,  PrimaryGeneratedColumn, Column } from 'typeorm';
import { Role } from '../auth/roles.enum';
import { OneToMany } from 'typeorm';
// import { Order } from '../order/order.entity';



@ObjectType()
@Entity()
export class UserEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

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
//   @OneToMany(() => Order, (order) => order.user, {nullable:true})
// @Field(() => [Order], { nullable: true })
// orders!: Order[]; 
}