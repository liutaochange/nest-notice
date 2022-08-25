import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NoticeModule } from './notice/notice.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getConfig } from './utils';

import { LoggerModule } from 'nestjs-pino';
import { pinoHttpOption } from './log';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      isGlobal: true,
      load: [getConfig],
      // envFilePath: `.env.${getEnv()}`,
    }),
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return { pinoHttp: pinoHttpOption(configService.get('NODE_ENV')) };
      },
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'admin',
      password: '123456',
      database: 'notice',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // 同步数据库
      timezone: 'local', // 时区
    }),
    NoticeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
