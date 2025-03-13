import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionFilter } from './common/filters/exception.filter';
import { LoggerService } from './infra/logger/logger.service';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { UnauthorizedInterceptor } from './common/interceptors/errors/inteceptors/unauthorized.interceptor';
import { NotFoundInterceptor } from './common/interceptors/errors/inteceptors/notfound.interceptor';
import { DatabaseInterceptor } from './common/interceptors/errors/inteceptors/database.interceptor';
import { ConflictInterceptor } from './common/interceptors/errors/inteceptors/conflict.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  //Filter
  app.useGlobalFilters(new AllExceptionFilter(new LoggerService()));

  //inteceptors
  app.useGlobalInterceptors(new ConflictInterceptor());
  app.useGlobalInterceptors(new DatabaseInterceptor());
  app.useGlobalInterceptors(new UnauthorizedInterceptor());
  app.useGlobalInterceptors(new NotFoundInterceptor());

  app.useGlobalInterceptors(new ResponseInterceptor());

  //Pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  //swagger config
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Architecture mvc com Nestjs')
    .setDescription('API Ecommerce, desafio técnico da DBRAS')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}
bootstrap();
