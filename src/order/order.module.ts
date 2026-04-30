import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { OrderItem } from './order-item.entity';
import { OrderService } from './order.service';
import { OrderResolver } from './order.resolver';
import { ProductEntity } from '../product/product.entity';
import { UserEntity } from '../users/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderItem, ProductEntity, UserEntity]),
  ],
  providers: [OrderService, OrderResolver],
})
export class OrderModule {}