import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { ValidationPipe } from './shared/validation.pipe';
import { Logger } from '@nestjs/common';

const port = process.env.PORT || 8000;

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port);
  Logger.log(`Server running on port ${port}`, 'Bootstrap');
}
bootstrap();
