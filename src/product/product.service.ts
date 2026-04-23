import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from './product.entity';
import { CreateProductInput } from './dto/create-product.input';

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

  remove(id: number) {
    return this.repo.delete(id);
  }
 
  async findByName(name: string) {
    return this.repo.findOne({
      where: { name },
    });
  }
}