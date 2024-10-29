import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //Importación de validaciones globales
  app.useGlobalPipes(
    new ValidationPipe({
      //Limpia los campos por si no se encuentran en el dto
      whitelist: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
