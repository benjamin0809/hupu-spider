import { Test, TestingModule } from '@nestjs/testing';
import { HupuSpiderController } from './hupu-spider.controller';
import { HupuSpiderService } from './hupu-spider.service';

describe('HupuSpiderController', () => {
  let controller: HupuSpiderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HupuSpiderController],
      providers: [HupuSpiderService],
    }).compile();

    controller = module.get<HupuSpiderController>(HupuSpiderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
