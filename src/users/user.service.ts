import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { JwtService } from '@nestjs/jwt';
import { Role } from '../auth/roles.enum';
import { UpdateProfileInput } from './dto/update-profile.input';
import { Order } from '../order/order.entity';
import { ProfileType } from './dto/profile.type';
import * as bcrypt from 'bcrypt';
import { ResetPasswordInput } from './dto/reset-password.input';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private repo: Repository<UserEntity>,

    @InjectRepository(Order)
    private orderRepo: Repository<Order>,

    private jwtService: JwtService, 
  ) {}

  findAll() {
    return this.repo.find();
  }

  findById(id: string) {
    return this.repo.findOne({ where: { id } });
  }

  findByUsername(username: string) {
    return this.repo.findOne({ where: { username } });
  }

  findByEmail(email: string) {
    return this.repo.findOne({ where: { email } });
  }

  findByRole(role: Role) {
    return this.repo.findOne({ where: { role } });
  }

  createUser(data: Partial<UserEntity>) {
    const user = this.repo.create(data);
    return this.repo.save(user);
  }

  async getProfile(userId: string): Promise<ProfileType> {
    const user = await this.repo.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    const orders = await this.orderRepo.find({
      where: { user: { id: userId } },
      order: { created_at: 'DESC' },
    });

    return {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      profilepic: user.profilepic,
      orders: orders.map((order) => ({
        id: order.id,
        status: order.status,
        total_amount: order.total_amount,
        payment_method: order.payment_method,
        shipping_address: order.shipping_address,
        order_date: order.order_date,
        order_items: order.order_items?.map((item) => ({
          id: item.id,
          quantity: item.quantity,
          price: item.price,
          subtotal: item.subtotal,
          productName: item.product?.name,
        })),
      })),
    };
  }

  async updateProfile(userId: string, input: UpdateProfileInput) {
    const user = await this.repo.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    if (input.username) user.username = input.username;
    if (input.profilepic) user.profilepic = input.profilepic;

    return this.repo.save(user);
  }

  async resetPassword(input: ResetPasswordInput): Promise<string> {
    const user = await this.repo.findOne({ where: { email: input.email } });
    if (!user) throw new NotFoundException('User not found with this email');

    user.password = await bcrypt.hash(input.newPassword, 10);
    await this.repo.save(user);

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      username: user.username,
    };

    return this.jwtService.sign(payload); 
  }
}