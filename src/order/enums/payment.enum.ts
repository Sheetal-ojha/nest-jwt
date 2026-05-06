import { registerEnumType } from '@nestjs/graphql';

export enum PaymentMethod {
  CASH_ON_DELIVERY = 'CASH_ON_DELIVERY',
  CREDIT_CARD = 'CREDIT_CARD',
  ESEWA = 'ESEWA',
  KHALTI = 'KHALTI',
}

registerEnumType(PaymentMethod, { name: 'PaymentMethod' });