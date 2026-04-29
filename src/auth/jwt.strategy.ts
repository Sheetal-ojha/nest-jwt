import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../users/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  private userService: UserService; // ✅ declare separately

  constructor(
    configService: ConfigService, // ✅ no private here
    userService: UserService,     // ✅ no private here
  ) {
    const secret = configService.get<string>('JWT_SECRET');

    if (!secret) {
      throw new Error('JWT_SECRET is missing in .env');
    }

    // super() must be called before anything else
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
    });

    // ✅ assign after super()
    this.userService = userService;
  }

  async validate(payload: any) {
    const user = await this.userService.findById(payload.sub); // ✅ works now

    if (!user) {
      throw new UnauthorizedException(
        'User no longer exists. Please login again.',
      );
    }

    return {
      userId: user.id,
      email: user.email,
      role: user.role,
    };
  }
}