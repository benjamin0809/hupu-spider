/*
 * @Author: your name
 * @Date: 2021-12-15 22:03:41
 * @LastEditTime: 2021-12-22 23:08:38
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \hupu-spider\src\app.module.ts
 */
import { Dependencies, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Connection } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './auth/user/user.module';
import { HupuModule } from './hupu/hupu.module';
import { HupuSpiderModule } from './hupu-spider/hupu-spider.module';
// @Dependencies(Connection)
@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UserModule,
    HupuModule,
    HupuSpiderModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
