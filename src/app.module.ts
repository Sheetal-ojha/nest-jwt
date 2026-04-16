import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { AppResolver } from './app.resolver';

import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';

import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      username: 'postgres',
      password: 'admin',
      database: 'logindb',
      autoLoadEntities: true,
      synchronize: true,
    }),

    UserModule,
    AuthModule,

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,   
      autoSchemaFile: true,
      context: ({ req }) => ({ req }),
    }),
  ],

  providers: [AppResolver, {
     provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})

export class AppModule {}