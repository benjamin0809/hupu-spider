import { PartialType } from '@nestjs/mapped-types';
import { CreateHupuSpiderDto } from './create-hupu-spider.dto';

export class UpdateHupuSpiderDto extends PartialType(CreateHupuSpiderDto) {}
