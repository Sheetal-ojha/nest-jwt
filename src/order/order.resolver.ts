import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from './order.entity';
import { CreateOrderInput } from './dto/create-order.input';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../auth/roles.enum';
import { OrderStatus } from './enums/order.enum';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Resolver()
export class OrderResolver {
  constructor(private orderService: OrderService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.USER, Role.ADMIN)
  @Mutation(() => Order)
  createOrder(
    @Args('input') input: CreateOrderInput,
    @CurrentUser() user: any,
  ) {
    return this.orderService.createOrder(user.userId, input);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.USER, Role.ADMIN)
  @Query(() => [Order])
  ordersByUser(@CurrentUser() user: any) {
    return this.orderService.ordersByUser(user.userId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.USER, Role.ADMIN)
  @Query(() => Order)
  order(@Args('id') id: string) {
    return this.orderService.order(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Mutation(() => Order)
  updateOrder(
    @Args('id') id: string,
    @Args('status', { type: () => OrderStatus }) status: OrderStatus,
  ) {
    return this.orderService.updateOrder(id, status);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.USER, Role.ADMIN)
  @Mutation(() => Order)
  deleteOrder(@Args('id') id: string) {
    return this.orderService.deleteOrder(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.USER, Role.ADMIN)
@Mutation(() => Order)
updateMyOrder(
  @Args('id') id: string,
  @Args('shipping_address') shipping_address: string,
  @CurrentUser() user: any,
) {
  return this.orderService.updateMyOrder(id, user.userId, shipping_address);
}

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
@Query(() => [Order])
getAllOrders() {
  return this.orderService.getAllOrders();
}
}