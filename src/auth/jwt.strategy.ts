import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../users/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  private userService: UserService; 

  constructor(
    configService: ConfigService,
    userService: UserService,    
  ) {
    const secret = configService.get<string>('JWT_SECRET');

    if (!secret) {
      throw new Error('JWT_SECRET is missing in .env');
    }

  
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
    });

    
    this.userService = userService;
  }

  async validate(payload: any) {
    const user = await this.userService.findById(payload.sub); 

    if (!user) {
      throw new UnauthorizedException(
        'User no longer exists. Please login again.',
      );
    }

    return {
      userId: user.id,
      email: user.email,
      role: user.role,
      username:user.username,
    };
  }
}