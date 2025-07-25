import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      errorHttpStatusCode: 422,
      exceptionFactory: (errors) => {
        return new Error(
          'Request contains properties that are not allowed: ' +
            errors
              .map(
                (e) =>
                  e.property +
                  (e.children?.length
                    ? ' (' + e.children.map((c) => c.property).join(', ') + ')'
                    : ''),
              )
              .join(', '),
        );
      },
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
