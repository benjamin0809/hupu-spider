/*
 * @Author: your name
 * @Date: 2021-12-15 22:28:22
 * @LastEditTime: 2021-12-16 00:02:56
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \hupu-spider\src\user\dto\create-user.dto.ts
 */
import { Column } from 'typeorm';

export class CreateUserDto {
  @Column()
  firstName: string;
  @Column()
  lastName: string;
  @Column({ default: true })
  isActive: boolean;
}
