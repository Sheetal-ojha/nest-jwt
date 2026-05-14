import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './product.entity';
import { ProductService } from './product.service';
import { ProductResolver } from './product.resolver';
import { OrderItem } from '../order/order-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity, OrderItem])],
  providers: [ProductService, ProductResolver],
})
export class ProductModule {}