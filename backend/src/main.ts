import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';
import { Config } from './common/enums/config.enum';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const port = configService.get(Config.PORT);

  console.log(`--- App listening on: http://localhost:${port}`);

  await app.listen(port);

  if (module.hot) {
    console.log(`--- Webpack Hot Module Replacement (HMR) enabled 🔥`);

    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
