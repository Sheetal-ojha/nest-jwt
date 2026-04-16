import { Field, ObjectType } from '@nestjs/graphql';
import { Entity,  PrimaryGeneratedColumn, Column } from 'typeorm';

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
}