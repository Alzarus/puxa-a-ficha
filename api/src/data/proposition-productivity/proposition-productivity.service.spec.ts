import { Test, TestingModule } from '@nestjs/testing';
import { PropositionProductivityService } from './proposition-productivity.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PropositionProductivity } from './entities/proposition-productivity.entity';
import { Repository } from 'typeorm';

describe('PropositionProductivityService', () => {
  let service: PropositionProductivityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PropositionProductivityService,
        {
          provide: getRepositoryToken(PropositionProductivity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<PropositionProductivityService>(
      PropositionProductivityService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
