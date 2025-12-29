import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
//import * as express from 'express';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';


import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

async function bootstrap() {
 // const app = await NestFactory.create(AppModule , { cors: true });

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );

// ✅ ENABLE CORS (required for Fastify)
  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  });
   // Enable JSON body parsing
//  app.use(express.json()); // <-- add this line if not already
 // app.use(express.urlencoded({ extended: true })); // optional if using form data
   //await app.register(require('@fastify/formbody'));
  // Optional: validation pipe
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // Global success formatter only
  app.useGlobalInterceptors(new ResponseInterceptor());

  //converting all bigint to string in responses
  (BigInt.prototype as any).toJSON = function () {
    return this.toString();
  };
  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}
bootstrap();
