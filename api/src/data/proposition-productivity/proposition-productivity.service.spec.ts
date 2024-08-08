import { Test, TestingModule } from '@nestjs/testing';
import { PropositionProductivityService } from './proposition-productivity.service';

describe('PropositionProductivityService', () => {
  let service: PropositionProductivityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PropositionProductivityService],
    }).compile();

    service = module.get<PropositionProductivityService>(PropositionProductivityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
