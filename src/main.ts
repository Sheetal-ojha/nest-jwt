import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

import * as express from 'express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

 
  app.enableCors({
    origin: true,
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: false,
      transform: true,
    }),
  );


  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));



  const port = process.env.PORT || 4000;

  await app.listen(port);
  console.log(`Server running on ${port}`);
}

bootstrap();