import { Test, TestingModule } from '@nestjs/testing';
import { GeneralProductivityService } from './general-productivity.service';

describe('GeneralProductivityService', () => {
  let service: GeneralProductivityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GeneralProductivityService],
    }).compile();

    service = module.get<GeneralProductivityService>(GeneralProductivityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
