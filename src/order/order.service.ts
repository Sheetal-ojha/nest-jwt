// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';

// import { Order } from './order.entity';
// import { OrderItem } from './order-item.entity';
// import { UserEntity } from '../users/user.entity';
// import { ProductEntity } from '../product/product.entity';
// import { CreateOrderInput } from './dto/create-order.input';

// @Injectable()
// export class OrderService {
//   constructor(
//     @InjectRepository(Order)
//     private orderRepo: Repository<Order>,

//     @InjectRepository(UserEntity)
//     private userRepo: Repository<UserEntity>,

//     @InjectRepository(ProductEntity)
//     private productRepo: Repository<ProductEntity>,
//   ) {}

//   async createOrder(userId: number, input: CreateOrderInput) {
//     const order = new Order();

//     const user = await this.userRepo.findOneBy({ id: userId });
//     if (!user) throw new Error('User not found');

//     order.user = user;
//     order.items = [];

//     for (const item of input.items) {
//       const product = await this.productRepo.findOneBy({
//         id: item.productId,
//       });

//       if (!product) throw new Error('Product not found');

//       const orderItem = new OrderItem();
//       orderItem.product = product;
//       orderItem.quantity = item.quantity;
//       orderItem.price = product.price;

//       order.items.push(orderItem);
//     }

//     return this.orderRepo.save(order);
//   }
// }