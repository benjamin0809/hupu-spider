/*
 * @Author: your name
 * @Date: 2021-12-23 20:32:44
 * @LastEditTime: 2021-12-23 20:56:09
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \hupu-spider\src\filters\custom-http-exception.ts
 */

import { HttpException } from '@nestjs/common';

interface CustomHttpExceptionProps {
  message?: string;
  status?: number;
  code?: number;
}
export class CustomHttpException extends HttpException {
  private code: number;
  constructor(props: CustomHttpExceptionProps) {
    super(props.message, props.status);
    this.code = props.code;
  }

  getErrorCode() {
    return this.code;
  }
}
