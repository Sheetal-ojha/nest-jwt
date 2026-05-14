import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AppResolver } from './app.resolver';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { Schema } from 'inspector/promises';

import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';

import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RolesGuard } from './auth/roles.guard';
import { ProductModule } from './product/product.module';
// import { UploadsController } from './uploads/uploads.controller';
import { UploadModule } from './uploads/upload.module';
import { UploadController } from './uploads/upload.controller';
import { OrderModule } from './order/order.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';



@Module({
  controllers:[AppController],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',


   
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST'),
        port: Number(config.get('DB_PORT')),
        username: config.get('DB_USERNAME'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      context: ({ req }) => ({ req }),
      sortSchema: true,

  playground: false,
         introspection: true,


  plugins: [
    ApolloServerPluginLandingPageLocalDefault(),
  ],
    }),

    UserModule,
    AuthModule,
    ProductModule, 
    UploadModule,
    OrderModule,
   
  ],

    //  controllers: [UploadController],

  providers: [
  AppResolver,
  AppService,
  {
    provide: APP_GUARD,
    useClass: AuthGuard,
  },
  {
    provide: APP_GUARD,
    useClass: RolesGuard,
  },
],
})
export class AppModule {}