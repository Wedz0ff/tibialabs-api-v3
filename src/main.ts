import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';
import { Logger } from '@nestjs/common';
import type { Request, Response, NextFunction } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('v3', { exclude: [''] });

  const logger = new Logger('RedirectMiddleware');

  type RedirectRule = {
    matcher: (path: string) => boolean;
    transform: (path: string) => string;
    description?: string;
  };

  const REDIRECT_STATUS = 301;

  const redirectRules: RedirectRule[] = [
    {
      // exact /v2 root -> /v3/misc
      matcher: (p) => p === '/v2' || p === '/v2/',
      transform: () => '/v3/misc',
      description: 'v2 root to v3 misc',
    },
    {
      matcher: (p) => p.startsWith('/v2/boostedcreature'),
      transform: (p) => p.replace(/^\/v2\/boostedcreature/, '/v3/boosted/creature'),
      description: 'boosted creature mapping',
    },
    {
      matcher: (p) => p.startsWith('/v2/boostedboss'),
      transform: (p) => p.replace(/^\/v2\/boostedboss/, '/v3/boostedboss'),
      description: 'boosted boss mapping',
    },
    {
      matcher: (p) => p.startsWith('/v2/'),
      transform: (p) => p.replace(/^\/v2/, '/v3/misc'),
      description: 'fallback v2 -> v3/misc',
    },
  ];

  const findRedirect = (path: string): { target: string; description?: string } | null => {
    for (const r of redirectRules) {
      if (r.matcher(path)) return { target: r.transform(path), description: r.description };
    }
    return null;
  };

  app.use((req: Request, res: Response, next: NextFunction) => {
    try {
      const path = req.path || '';
      const query = req.originalUrl && req.originalUrl.length > path.length ? req.originalUrl.slice(path.length) : '';

      const found = findRedirect(path);
      if (!found) return next();

      const finalUrl = `${found.target}${query}`;
      logger.log(`redirecting ${req.originalUrl} -> ${finalUrl} (${found.description ?? 'rule'})`);
      return res.redirect(REDIRECT_STATUS, finalUrl);
    } catch (err) {
      logger.error('redirect middleware error', (err as Error).stack ?? err);
      return next();
    }
  });

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
