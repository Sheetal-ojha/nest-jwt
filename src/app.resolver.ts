import { Resolver, Query, Context } from '@nestjs/graphql';

@Resolver()
export class AppResolver {

  @Query(() => String)
  hello() {
    return ' working ';
  }


  @Query(() => String)
  getProfile(@Context() context) {
    return JSON.stringify(context.req.user);
  }
}