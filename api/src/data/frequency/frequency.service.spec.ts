import { Test, TestingModule } from '@nestjs/testing';
import { FrequencyService } from './frequency.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Frequency } from './entities/frequency.entity';
import { Repository } from 'typeorm';

describe('FrequencyService', () => {
  let service: FrequencyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FrequencyService,
        {
          provide: getRepositoryToken(Frequency),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<FrequencyService>(FrequencyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
