import 'module-alias/register';
import 'reflect-metadata';

import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from '@/app.module';
import { Config } from '@/common/enums/config.enum';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const port = configService.get(Config.PORT);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Gatcha')
    .setDescription('The gatcha API description')
    .setVersion('1.0')
    .addTag('gatcha')
    .build();

  const documentFactory = () =>
    SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(port, () => {
    console.log(`App listening on: http://localhost:${port} 💚`);
  });
}

bootstrap();
