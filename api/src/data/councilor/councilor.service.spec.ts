import { Test, TestingModule } from '@nestjs/testing';
import { CouncilorService } from './councilor.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Councilor } from './entities/councilor.entity';
import { Repository } from 'typeorm';

describe('CouncilorService', () => {
  let service: CouncilorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CouncilorService,
        {
          provide: getRepositoryToken(Councilor),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<CouncilorService>(CouncilorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
