import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);

  // cors
  app.enableCors();
  // prefix
  const globalPrefix = 'api/v1';
  app.setGlobalPrefix(globalPrefix);

  // config swagger
  const APP_NAME = process.env.NAME;
  const VERSION = process.env.VERSION;

  const configSwagger = new DocumentBuilder()
    .setTitle(APP_NAME)
    .setDescription('Back-End for an Angular shop project')
    .setVersion(VERSION)
    .addTag('shopDb')
    .build();

  const docSwagger = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('test', app, docSwagger);
  try {
    const port = process.env.PORT;
    await app.listen(port, () => {
      logger.log('Listening at http://localhost:' + port + '/' + globalPrefix);
    });
  } catch (error) {
    throw new Error(`${error.message}`);
  }
}
bootstrap();
