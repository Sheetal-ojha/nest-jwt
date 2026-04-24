import { Resolver, Query, Context } from '@nestjs/graphql';
import { UserType } from './users/dto/user.type';

@Resolver()
export class AppResolver {

  @Query(() => String)
  hello() {
    return ' working ';
  }


  @Query(() => UserType)
  getProfile(@Context() context) {
     return context.req.user;
  }
}