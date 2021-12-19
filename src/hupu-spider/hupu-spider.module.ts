/*
 * @Author: your name
 * @Date: 2021-12-16 20:46:00
 * @LastEditTime: 2021-12-16 21:44:42
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \hupu-spider\src\hupu-spider\hupu-spider.module.ts
 */
import { Module } from '@nestjs/common';
import { HupuSpiderService } from './hupu-spider.service';
import { HupuSpiderController } from './hupu-spider.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HupuSpider } from './entities/hupu-spider.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HupuSpider])],
  controllers: [HupuSpiderController],
  providers: [HupuSpiderService],
})
export class HupuSpiderModule {}
