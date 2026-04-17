import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/user.service';
import * as bcrypt from 'bcrypt';
import { RegisterInput } from './dto/register.input';
import { UserEntity } from '../users/user.entity';



@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
   
    private jwtService: JwtService,
  ) {}

 
  async signIn(username: string, password: string) {
    const user = await this.userService.findByUsername(username);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Wrong password');
    }

    const payload = {
      sub: user.id,
      // username: user.username,
      email: user.email,
    };

    return {
  id: user.id,
  username: user.username,
  access_token: this.jwtService.sign(payload),
};
  }

  
 async signUp(data: RegisterInput )  { 

  console.log("AUTH SERVICE INPUT:", data);

  const { username, email, password } = data;

  const existingUser = await this.userService.findByUsername(username);

  if (existingUser) {
    throw new UnauthorizedException('User already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  return this.userService.createUser({
    username,
    email,
    password: hashedPassword,
  });
}

}