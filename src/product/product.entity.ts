import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ObjectType,Field, Int, Float } from '@nestjs/graphql';
@ObjectType()
@Entity()
export class ProductEntity {

   @PrimaryGeneratedColumn('uuid')
  @Field()
  id!: string;


  @Field()
  @Column()
  name!: string;
  

  @Field()
  @Column('float')
  price!: number;

  @Field()
  @Column()
  description!: string;

    @Field({ nullable: true })
  @Column({ nullable: true })
  image!: string;
}