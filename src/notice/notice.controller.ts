import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiOkResponse } from '@nestjs/swagger';
import { NoticeService } from './notice.service';
import { CreateNoticeDto } from './dto/create-notice.dto';
import { UpdateNoticeDto } from './dto/update-notice.dto';

@ApiTags('消息通知')
@Controller('notice')
export class NoticeController {
  constructor(private readonly noticeService: NoticeService) {}

  @ApiOperation({ summary: '创建消息' })
  @Post('/create')
  create(@Body() createNoticeDto: CreateNoticeDto) {
    return this.noticeService.create(createNoticeDto);
  }

  @ApiOperation({ summary: '获取消息列表' })
  @Get('list')
  findAll() {
    return this.noticeService.findAll();
  }

  @ApiOperation({ summary: '获取指定消息' })
  @Get('/detail/:id')
  findOne(@Param('id') id: string) {
    return this.noticeService.findOne(id);
  }

  @ApiOperation({ summary: '更新指定消息' })
  @Post('/update/:id')
  update(@Param('id') id: string, @Body() updateNoticeDto: UpdateNoticeDto) {
    return this.noticeService.update(id, updateNoticeDto);
  }

  @ApiOperation({ summary: '删除指定消息' })
  @Delete('/delete/:id')
  remove(@Param('id') id: string) {
    return this.noticeService.remove(id);
  }
}
