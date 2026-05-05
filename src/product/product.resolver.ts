import { Resolver, Query, Mutation, Args, Int, ID, Float } from '@nestjs/graphql';
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

 @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
@Mutation(() => ProductEntity)
async createProduct(
  @Args('name') name: string,
  @Args('price', { type: () => Float  }) price: number,
  @Args('description') description: string,
  @Args('image', { nullable: true }) image: string,
  @Args('quantity', { type: () => Int, defaultValue: 0 }) quantity: number, // ✅ add
) {
  return this.productService.create({ name, price, description, image, quantity });
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
  @Args('id', { type: () => String }) id: string,
  @Args('input') input: UpdateProductInput,
) {
  console.log("RAW INPUT:", JSON.stringify(input)); // add this
  console.log("INPUT KEYS:", Object.keys(input));   // add this
  return this.productService.update(id, input);
}


@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
@Mutation(() => Boolean)
async deleteProduct(
  @Args('id', { type: () => String }) id: string,
): Promise<boolean> {
  await this.productService.remove(id);
  return true;
}

@UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.USER)
  @Query(() => ProductEntity)
getProductById(  @Args('id', { type: () => String }) id: string,
) {
  return this.productService.findById(id);
}
}