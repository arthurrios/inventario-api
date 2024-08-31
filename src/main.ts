import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable validation globally
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Automatically remove properties that do not have decorators
      forbidNonWhitelisted: true, // Throw errors if properties that are not in the DTO are sent
      transform: true, // Automatically transform payloads into DTO instances
    }),
  );

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Replace with your frontend origin
  });


  const config = new DocumentBuilder()
    .setTitle('Inventory API')
    .setDescription(
      'An API to manage inventory created by Arthur Rios and Eduardo Santana',
    )
    .setVersion('1.0')
    .addTag('inventory')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || 3001;
  await app.listen(port);
}
bootstrap();
