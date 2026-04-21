import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ObjectType,Field, Int, Float } from '@nestjs/graphql';
@ObjectType()
@Entity()
export class ProductEntity {

    @Field()
  @PrimaryGeneratedColumn()
  id!: number;


  @Field()
  @Column()
  name!: string;
  

  @Field()
  @Column()
  price!: number;

  @Field()
  @Column()
  description!: string;
}