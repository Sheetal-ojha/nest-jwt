import { Entity, PrimaryGeneratedColumn, Column, OneToOne, CreateDateColumn, OneToMany } from 'typeorm';
import { ObjectType,Field, Int, Float } from '@nestjs/graphql';
import { OrderItem } from '../order/order-item.entity';
// import { Stock } from '../stock/stock.entity';


@ObjectType()
@Entity()
export class ProductEntity {

   @PrimaryGeneratedColumn('uuid')
  @Field()
  id!: string;


  @Field({nullable:true})
  @Column()
  name!: string;
  

  @Field({nullable:true})
  @Column('float')
  price!: number;

  @Field()
  @Column()
  description!: string;

    @Field({ nullable: true })
  @Column({ nullable: true })
  image!: string;


  @Field(() => Int, {nullable:true})
  @Column({ default: 0 })
  quantity!: number;


  @Field()
  @CreateDateColumn()
  createdAt!:Date;



    @OneToMany(() => OrderItem, (item) => item.product, { nullable: true })
    @Field(()=> [OrderItem],{nullable:true})
  orderItems?: OrderItem[];

}