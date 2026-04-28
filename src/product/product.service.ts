import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from './product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private repo: Repository<ProductEntity>,
  ) {}

  async create(data: CreateProductInput) {
  const product = this.repo.create(data);
  return await this.repo.save(product);
}

  findAll() {
    return this.repo.find();
  }

  async remove(id: string) {
  const product = await this.repo.findOne({ where: { id } });

  if (!product) {
    throw new Error('Product not found');
  }

  await this.repo.remove(product);
}
 
  async findById(id: string) {
    return this.repo.findOne({
      where: { id },
    });

  }
async update(id: string, input: UpdateProductInput) {
  const product = await this.repo.findOne({ where: { id } });

  if (!product) {
    throw new Error('Product not found');
  }

  const cleanInput = Object.fromEntries(
    Object.entries(input).filter(([_, v]) => v !== undefined && v !== null),
  );

  if (Object.keys(cleanInput).length === 0) {
    throw new Error('No update data received');
  }

  return await this.repo.update(id, cleanInput);

  // return this.repo.findOne({ where: { id } });
}
}