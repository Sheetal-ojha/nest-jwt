import { registerEnumType } from '@nestjs/graphql';


export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
  // SUPER_ADMIN ='SUPER_ADMIN',
}
registerEnumType(Role, {
  name: 'Role',
});