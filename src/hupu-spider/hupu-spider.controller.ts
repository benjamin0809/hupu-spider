/*
 * @Author: your name
 * @Date: 2021-12-16 20:45:59
 * @LastEditTime: 2021-12-19 23:26:37
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \hupu-spider\src\hupu-spider\hupu-spider.controller.ts
 */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { HupuSpiderService } from './hupu-spider.service';
import { CreateHupuSpiderDto } from './dto/create-hupu-spider.dto';
import { UpdateHupuSpiderDto } from './dto/update-hupu-spider.dto';

@Controller('hupu')
export class HupuSpiderController {
  constructor(private readonly hupuSpiderService: HupuSpiderService) {}

  @Post()
  create(@Body() createHupuSpiderDto: CreateHupuSpiderDto) {
    return this.hupuSpiderService.create(createHupuSpiderDto);
  }

  @Get()
  findAll() {
    return this.hupuSpiderService.findAll();
  }

  @Get('upload')
  upload() {
    return this.hupuSpiderService.upload();
  }

  @Get('/getImage')
  getMobileHupuImages() {
    return this.hupuSpiderService.getMobileHupuImages(
      'https://m.hupu.com/bbs/4614-1',
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hupuSpiderService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateHupuSpiderDto: UpdateHupuSpiderDto,
  ) {
    return this.hupuSpiderService.update(+id, updateHupuSpiderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hupuSpiderService.remove(+id);
  }
}
