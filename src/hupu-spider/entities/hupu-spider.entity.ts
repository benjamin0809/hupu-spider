/*
 * @Author: your name
 * @Date: 2021-12-16 20:46:00
 * @LastEditTime: 2021-12-16 23:33:54
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \hupu-spider\src\hupu-spider\entities\hupu-spider.entity.ts
 */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class HupuSpider {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'bigint', nullable: false })
  articleid: number;
  @Column({ length: 256 })
  title: string;
  @Column({ length: 128 })
  avatar: string;
  @Column({ length: 40 })
  username: string;
  @Column({ type: 'text' })
  images: string;
  @Column({ length: 256 })
  sourceUrl: string;
  @Column({ type: 'datetime', nullable: true })
  createTime: string;
  @Column({ type: 'datetime', nullable: true })
  articleTime: string;
  @Column({ type: 'datetime', nullable: true })
  modifiedTime: string;
}
