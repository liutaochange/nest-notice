import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class CreateNoticeDto {
  @ApiProperty({ description: '消息标题' })
  @IsString()
  @IsNotEmpty({ message: '文章标题必填' })
  @Length(2, 20, { message: '文章标题的长度不能小于10不能大于20' })
  readonly title: string;

  @ApiProperty({ description: '消息作者' })
  readonly author: string;

  @ApiProperty({ description: '消息内容' })
  @IsString({ message: '消息内容数据类型不合法' })
  readonly content: string;

  @ApiProperty({ description: '消息跳转链接' })
  readonly target_url: string;

  @ApiProperty({ description: '消息类型', enum: [0, 1, 2] })
  @IsNumber(
    {
      allowNaN: false,
    },
    { message: '消息类型数据类型不合法' },
  )
  readonly type: number;
}
