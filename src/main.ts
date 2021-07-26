import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //파이프를 만들거임. 파이프는 미들웨어같은 거
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true, //값이 맞지 않으면 리퀘스트를 막아버림
      transform: true //url은 기본적으로 string인데 실제 타입으로 바꿔줌
    }),
  );
  await app.listen(3000);
}
bootstrap();
