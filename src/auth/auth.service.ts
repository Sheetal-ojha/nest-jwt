import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/user.service';
import * as bcrypt from 'bcrypt';
import { RegisterInput } from './dto/register.input';
import { Role } from './roles.enum';
import { UserEntity } from '../users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Wrong password');
    }

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    return {
      id: user.id,
      username: user.username,
      access_token: this.jwtService.sign(payload),
    };
  }

  async signUp(data: RegisterInput): Promise<UserEntity> {
    const { username, email, password, role } = data;

    const existingUser = await this.userService.findByEmail(email);
    if (existingUser) {
      throw new UnauthorizedException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let assignedRole = Role.USER;

    if (role === Role.ADMIN) {
      const adminExists = await this.userService.findByRole(Role.ADMIN);

      if (adminExists) {
        throw new UnauthorizedException(
          'Admin already exists. You cannot sign up as admin.',
        );
      }

      assignedRole = Role.ADMIN;
    }

    return this.userService.createUser({
      username,
      email,
      password: hashedPassword,
      role: assignedRole,
    });
  }
}