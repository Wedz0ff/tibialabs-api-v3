import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('v3', { exclude: [''] });

  const config = new DocumentBuilder()
    .setTitle('TibiaLabs API')
    .setDescription('Useful informations for your Tibian applications.')
    .setVersion('3.0')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/swagger', app, documentFactory);

  app.use(
    '/docs',
    apiReference({
      metaData: {
        title: 'TibiaLabs API v3',
      },
      theme: 'purple',
      spec: {
        content: documentFactory,
      },
    }),
  );

  app.enableCors({
    origin: '*',
    methods: 'GET',
    allowedHeaders: 'Content-Type, Accept',
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
