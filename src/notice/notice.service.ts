import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNoticeDto } from './dto/create-notice.dto';
import { UpdateNoticeDto } from './dto/update-notice.dto';
import { Notice } from './entities/notice.entity';

@Injectable()
export class NoticeService {
  constructor(
    @InjectRepository(Notice)
    private noticeRepository: Repository<Notice>,
  ) {}

  async create(createNoticeDto: CreateNoticeDto) {
    const info = this.noticeRepository.create(createNoticeDto);
    return await this.noticeRepository.save(info);
  }

  findAll() {
    return this.noticeRepository.find();
  }

  findOne(id: string) {
    return this.noticeRepository.findOneBy({ id });
  }

  async update(id: string, updateNoticeDto: UpdateNoticeDto) {
    const property = await this.noticeRepository.findOne({
      where: { id },
    });
    if (property) {
      return await this.noticeRepository.save({
        ...property,
        ...updateNoticeDto,
      });
    } else {
      throw new HttpException(`${id}不存在`, 500);
    }
  }

  async remove(id: string) {
    const property = await this.noticeRepository.findOne({
      where: { id },
    });
    if (property) {
      return await this.noticeRepository.delete({
        id,
      });
    } else {
      throw new HttpException(`${id}不存在`, 500);
    }
  }
}
