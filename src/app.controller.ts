import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AppService } from './app.service';
import { Logger } from 'nestjs-pino';

@ApiTags('公共接口')
@Controller('/common')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly logger: Logger,
  ) {}

  @ApiOperation({ summary: '获取公共信息' })
  @Get('/info')
  getHello(): string {
    this.logger.log('请求开始');
    return this.appService.getInfo();
  }
}
