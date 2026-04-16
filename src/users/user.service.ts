import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private repo: Repository<UserEntity>,
  ) {}

  
  findAll() {
    return this.repo.find();
  }

  
  // findById(id: number) {
  //   return this.repo.findOne({ where: { id } });
  // }

  findByUsername(username: string) {
    return this.repo.findOne({ where: { username: username } });
  }

 
  createUser(data: Partial<UserEntity>) {
    const user = this.repo.create(data);
    return this.repo.save(user);
  }
}