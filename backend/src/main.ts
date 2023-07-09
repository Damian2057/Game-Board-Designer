import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from "@nestjs/common";
import * as process from "process";

async function main() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  //TODO: app.enableCors();
  await app.listen(process.env.BACKEND_PORT);
  console.log(`Application is running on: ${process.env.BACKEND_PORT}`);
}
main().then(() => console.log("Application started"));