import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import * as csurf from 'csurf';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './common/filter/index';
import { TransformInterceptor } from './common/interceptors/index';
import { ValidationPipe } from './common/pipe/index';
import { generateDocument } from './doc';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: false,
    cors: true,
  });

  app.use(helmet());

  // 配合cookie一起使用
  app.use(cookieParser());
  app.use(csurf({ cookie: true, ignoreMethods: ['GET', 'POST', 'OPTIONS'] }));

  app.useLogger(app.get(Logger));

  app.enableCors();

  // 设置全局路由前缀
  app.setGlobalPrefix('api/v1');

  // 全局管道验证
  app.useGlobalPipes(new ValidationPipe());

  // 统一响应体格式
  app.useGlobalInterceptors(new TransformInterceptor());

  // 统一处理异常
  app.useGlobalFilters(new AllExceptionFilter());

  // 接入 swagger 文档
  generateDocument(app);

  console.log('启动成功');

  await app.listen(3000);
}
bootstrap();
