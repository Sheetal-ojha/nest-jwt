import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../auth/roles.enum';
import { ProductService } from './product.service';
import { ProductEntity } from './product.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { UseGuards } from '@nestjs/common';
import { UpdateProductInput } from './dto/update-product.input';


@Resolver()
export class ProductResolver {
  constructor(private productService: ProductService) {}

 
  @Roles(Role.ADMIN)
@Mutation(() => ProductEntity)
async createProduct(
  @Args('name') name: string,
  @Args('price') price: number,
  @Args('description') description: string,
  @Args('image') image: string,
) {
  return await this.productService.create({
    name,
    price,
    description,
    image,
  });
}


@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
@Mutation(() => ProductEntity)
updateProduct(
  @Args('id', { type: () => Int }) id: number,
  @Args('input') input: UpdateProductInput,
) {
  return this.productService.update(id, input);
}


@UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Mutation(() => ProductEntity)
  deleteProduct(
    @Args('id', { type: () => Int }) id: number,
  ) {
    this.productService.remove(id);
    return "Product deleted";
  }


  @Roles(Role.ADMIN, Role.USER)
  @Query(() => ProductEntity)
getProductByName(@Args('name') name: string) {
  return this.productService.findByName(name);
}
}