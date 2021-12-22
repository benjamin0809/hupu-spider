/*
 * @Author: your name
 * @Date: 2021-12-16 20:45:59
 * @LastEditTime: 2021-12-22 23:34:02
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
  Query,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { HupuSpiderService } from './hupu-spider.service';
import { CreateHupuSpiderDto } from './dto/create-hupu-spider.dto';
import { UpdateHupuSpiderDto } from './dto/update-hupu-spider.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('hupu')
export class HupuSpiderController {
  constructor(private readonly hupuSpiderService: HupuSpiderService) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createHupuSpiderDto: CreateHupuSpiderDto) {
    return this.hupuSpiderService.create(createHupuSpiderDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.hupuSpiderService.findAll();
  }

  @Get('/page')
  findSome(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
    @Query('name') name: string,
  ) {
    return this.hupuSpiderService.page({
      page: +page,
      pageSize: +pageSize,
      name,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('/getImage')
  getMobileHupuImages() {
    return this.hupuSpiderService.fetchMore();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hupuSpiderService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateHupuSpiderDto: UpdateHupuSpiderDto,
  ) {
    return this.hupuSpiderService.update(+id, updateHupuSpiderDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hupuSpiderService.remove(+id);
  }
}
