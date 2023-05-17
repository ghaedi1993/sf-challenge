import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import helmet from 'helmet'; 
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Snapfood')
    .setDescription('The Snapfood delay alert API description')
    .setVersion('1.0')
    .addTag('snapfood')
    .addBearerAuth()
    .build();
    app.useGlobalPipes(new ValidationPipe());
    app.enableCors();
    app.use(helmet());
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
