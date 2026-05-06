import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { OrderItem } from './order-item.entity';
import { ProductEntity } from '../product/product.entity';
import { UserEntity } from '../users/user.entity';
import { CreateOrderInput } from './dto/create-order.input';
import { OrderStatus } from './enums/order.enum';
import { Order } from './order.entity';
@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepo: Repository<Order>,

    @InjectRepository(OrderItem)
    private orderItemRepo: Repository<OrderItem>,

    @InjectRepository(ProductEntity)
    private productRepo: Repository<ProductEntity>,

    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,
  ) {}

  async createOrder(userId: string, input: CreateOrderInput): Promise<Order> {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    const orderItems: OrderItem[] = [];
    let total_amount = 0;

    for (const item of input.order_items) {
      const product = await this.productRepo.findOne({
        where: { id: item.product_id },
      });

      if (!product) {
        throw new NotFoundException(`Product ${item.product_id} not found`);
      }

      if (product.quantity < item.quantity) {
        throw new BadRequestException(
          `Not enough stock for ${product.name}. Available: ${product.quantity}`,
        );
      }

      const subtotal = product.price * item.quantity;
      total_amount += subtotal;

      const orderItem = this.orderItemRepo.create({
        product,
        quantity: item.quantity,
        price: product.price,
        subtotal,
      });

      orderItems.push(orderItem);
    }

    const order = this.orderRepo.create({
      user,
      shipping_address: input.shipping_address,
      payment_method: input.payment_method,
      total_amount,
      order_items: orderItems,
      status: OrderStatus.PENDING,
    });

    const savedOrder = await this.orderRepo.save(order);

   
    for (const item of input.order_items) {
      await this.productRepo.decrement(
        { id: item.product_id },
        'quantity',
        item.quantity,
      );
    }

    return savedOrder;
  }

  async ordersByUser(userId: string): Promise<Order[]> {
    return this.orderRepo.find({
      where: { user: { id: userId } },
      order: { created_at: 'DESC' },
    });
  }

  async order(id: string): Promise<Order> {
    const order = await this.orderRepo.findOne({ where: { id } });
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  async updateOrder(id: string, status: OrderStatus): Promise<Order> {
    const order = await this.orderRepo.findOne({ where: { id } });
    if (!order) throw new NotFoundException('Order not found');

    order.status = status;
    return this.orderRepo.save(order);
  }


  async updateMyOrder(id: string, userId: string, shipping_address: string): Promise<Order> {
  const order = await this.orderRepo.findOne({
    where: { id, user: { id: userId } },
  });

  if (!order) throw new NotFoundException('Order not found');

  if (order.status !== OrderStatus.PENDING) {
    throw new BadRequestException('Cannot update order after it is confirmed');
  }

  order.shipping_address = shipping_address;
  return this.orderRepo.save(order);
}

  async deleteOrder(id: string): Promise<Order> {
    const order = await this.orderRepo.findOne({ where: { id } });
    if (!order) throw new NotFoundException('Order not found');

    if (order.status !== OrderStatus.PENDING) {
      throw new BadRequestException('Only PENDING orders can be cancelled');
    }

    // decrease order after save order
    for (const item of order.order_items) {
      await this.productRepo.increment(
        { id: item.product.id },
        'quantity',
        item.quantity,
      );
    }

    order.status = OrderStatus.CANCELLED;
    return this.orderRepo.save(order);
  }

  async getAllOrders(): Promise<Order[]> {
  return this.orderRepo.find({
    order: { created_at: 'DESC' },
  });
}
}