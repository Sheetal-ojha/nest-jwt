import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../auth/roles.enum';
import { ProductService } from './product.service';
import { ProductEntity } from './product.entity';

@Resolver()
export class ProductResolver {
  constructor(private productService: ProductService) {}

 
  @Roles(Role.admin)
  @Mutation(() => String)
  createProduct(
    @Args('name') name: string,
    @Args('price') price: number,
    @Args('description') description: string,
  ) {
    this.productService.create({ name, price, description });
    return "Product created";
  }


  @Roles(Role.admin)
  @Mutation(() => String)
  deleteProduct(
    @Args('id', { type: () => Int }) id: number,
  ) {
    this.productService.remove(id);
    return "Product deleted";
  }


  @Roles(Role.admin, Role.user)
  @Query(() => [ProductEntity])
  getProducts() {
    return this.productService.findAll();
  }
}