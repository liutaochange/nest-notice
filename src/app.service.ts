import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}

  getInfo(): string {
    return `current DB_HOST is ${this.configService.get('DB_HOST')}`;
  }
}
