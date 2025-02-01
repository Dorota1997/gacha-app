import 'reflect-metadata';
import 'module-alias/register';
import * as cookieParser from 'cookie-parser';

import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from '@/app.module';
import { Config } from '@/common/enums/config.enum';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  const configService = app.get(ConfigService);

  app.enableCors({
    credentials: true,
    origin: [configService.get(Config.CLIENT_URL)],
  });

  const port = configService.get(Config.PORT);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Gatcha')
    .setDescription('The gatcha API description')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      in: 'header',
      name: 'Authorization',
      description: 'Enter your Bearer token',
    })
    .addSecurityRequirements('bearer')
    .build();

  const documentFactory = () =>
    SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(port, () => {
    console.log(`App listening on: http://localhost:${port} 💚`);
  });
}

bootstrap();
