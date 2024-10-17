import { Test, TestingModule } from '@nestjs/testing';
import { PropositionService } from './proposition.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Proposition } from './entities/proposition.entity';
import { Repository } from 'typeorm';

describe('PropositionService', () => {
  let service: PropositionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PropositionService,
        {
          provide: getRepositoryToken(Proposition),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<PropositionService>(PropositionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
