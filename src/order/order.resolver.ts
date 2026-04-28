// import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
// // import { Order } from './order.entity';
// import { OrderService } from './order.service';
// import { AuthGuard } from '@nestjs/passport';
// import { CreateOrderInput } from './dto/create-order.input';
// import { UseGuards } from '@nestjs/common';

// @Resolver(() => Order)
// export class OrderResolver {
//   constructor(private orderService: OrderService) {}


//     @UseGuards(AuthGuard)
//   @Mutation(() => Order)
//   createOrder(
//     @Args('input') input: CreateOrderInput,
//     @Context() context: any,
//   ) {
//     const user = context.req.user;
//     return this.orderService.createOrder(user.id, input);
//   }
// }