import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from '../users/user.module';
import { Role } from './roles.enum';
import { GoogleStrategy } from './google.strategy';
@Module({
  imports: [
    UserModule,
    PassportModule,

JwtModule.registerAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (config: ConfigService) => ({
    secret: config.get<string>('JWT_SECRET')!,
    signOptions: {
      expiresIn: (config.get<string>('JWT_EXPIRES_IN') || '7d') as any,
    },
  }),
})
  ],

  providers: [AuthService, AuthResolver, JwtStrategy,GoogleStrategy],
  exports: [AuthService],
})
export class AuthModule {}