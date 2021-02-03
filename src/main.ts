import { NestFactory } from '@nestjs/core';
import * as morgan from 'morgan';
import { AppModule } from './app.module';
import * as csurf from 'csurf';
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: true });
  app.enableCors();
  app.use(morgan('dev'));

  // app.use(csurf());
  // app.use(helmet());
  // app.use(
  //   rateLimit({
  //     windowMs: 15 * 60 * 1000, // 15 minutes
  //     max: 100, // limit each IP to 100 requests per windowMs
  //   }),
  // );

  await app.listen(3000);
}
bootstrap();
