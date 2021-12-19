import { Test, TestingModule } from '@nestjs/testing';
import { HupuSpiderService } from './hupu-spider.service';

describe('HupuSpiderService', () => {
  let service: HupuSpiderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HupuSpiderService],
    }).compile();

    service = module.get<HupuSpiderService>(HupuSpiderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
