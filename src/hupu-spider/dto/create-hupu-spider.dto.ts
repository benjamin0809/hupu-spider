/*
 * @Author: your name
 * @Date: 2021-12-16 20:46:00
 * @LastEditTime: 2021-12-16 22:05:44
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \hupu-spider\src\hupu-spider\dto\create-hupu-spider.dto.ts
 */
import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class CreateHupuSpiderDto {
  @Column({ type: 'bigint', nullable: false })
  articleid: number;
  @Column({ length: 256 })
  title: string;
  @Column({ length: 128, default: 'nothing' })
  avatar: string;
  @Column({ length: 40 })
  username: string;
  @Column({ type: 'text' })
  images: string;
  @Column({ length: 256 })
  sourceUrl: string;
  @Column({ type: 'datetime', default: Date.now() })
  createTime: string;
  @Column({ type: 'datetime' })
  articleTime: string;
  @Column({ type: 'datetime' })
  modifiedTime: string;
}
