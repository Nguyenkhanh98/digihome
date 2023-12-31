import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/all-exception';
import { HttpStatus, Logger, ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { initSwagger } from './common/config/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: HttpStatus.PRECONDITION_FAILED,
      transform: true,
    }),
  );

  app.enableCors();
  app.setGlobalPrefix('api');
  initSwagger(app);

  const configService = app.get(ConfigService);
  const port = configService.get('PORT');

  Logger.log(`App listening at ${port}`);
  await app.listen(3000);
}
bootstrap();
