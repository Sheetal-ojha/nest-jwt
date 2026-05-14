import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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
    const existing = await this.repo.findOne({
      where: { name: data.name },
    });

    if (existing) {
      throw new BadRequestException(
        `Product "${data.name}" already exists`,
      );
    }

    const product = this.repo.create(data);
    return await this.repo.save(product);
  }

  findAll() {
    return this.repo.find({
      relations: { orderItems: { order: { user: true } } }, // ✅ load relations
    });
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
      relations: { orderItems: { order: { user: true } } }, // ✅ load relations
    });
  }

  async update(id: string, input: UpdateProductInput) {
    const product = await this.repo.findOne({ where: { id } });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    if (input.name) {
      const existing = await this.repo.findOne({
        where: { name: input.name },
       
      });

      if (existing && existing.id !== id) {
        throw new BadRequestException(
          `Product "${input.name}" already exists. Please add a new name.`,
        );
      }
    }

    for (const key in input) {
      if (input[key] !== undefined && input[key] !== null) {
        product[key] = input[key];
      }
    }

    return this.repo.save(product);
  }
}