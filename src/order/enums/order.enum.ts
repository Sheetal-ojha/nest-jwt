import { registerEnumType } from '@nestjs/graphql';

export enum OrderStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
}
// export enum ReportPeriod {
//   DAILY = 'daily',
//   WEEKLY = 'weekly',
//   MONTHLY = 'monthly',
// }

// registerEnumType(OrderStatus, { name: 'OrderStatus' });
// registerEnumType(ReportPeriod, { name: 'ReportPeriod' });



registerEnumType(OrderStatus, { name: 'OrderStatus' });
