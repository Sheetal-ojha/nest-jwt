import { Field, ObjectType } from '@nestjs/graphql';
import { Entity,  PrimaryGeneratedColumn, Column } from 'typeorm';
import { Role } from '../auth/roles.enum';
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
  default: Role.user,
})
role!: Role;
}