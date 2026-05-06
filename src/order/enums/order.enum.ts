import { registerEnumType } from '@nestjs/graphql';

export enum OrderStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
}




registerEnumType(OrderStatus, { name: 'OrderStatus' });
