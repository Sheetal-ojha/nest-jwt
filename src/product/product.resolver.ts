import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
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
@Roles(Role.ADMIN, Role.USER)
@Query(() => [ProductEntity])
getAllProducts() {
  return this.productService.findAll();
}


@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
@Mutation(() => ProductEntity)
async updateProduct(
  @Args('id', { type: () => Int }) id: number,
  @Args('input') input: UpdateProductInput,
) {
  return this.productService.update(id, input);
}


@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
@Mutation(() => Boolean)
async deleteProduct(
  @Args('id', { type: () => Int }) id: number,
): Promise<boolean> {
  await this.productService.remove(id);
  return true;
}

@UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.USER)
  @Query(() => ProductEntity)
getProductById(  @Args('id', { type: () => Int }) id: number,
) {
  return this.productService.findById(id);
}
}