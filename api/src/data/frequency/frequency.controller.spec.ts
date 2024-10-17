import { Test, TestingModule } from '@nestjs/testing';
import { FrequencyController } from './frequency.controller';
import { FrequencyService } from './frequency.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Frequency } from './entities/frequency.entity';
import { Repository } from 'typeorm';

describe('FrequencyController', () => {
  let controller: FrequencyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FrequencyController],
      providers: [
        FrequencyService,
        {
          provide: getRepositoryToken(Frequency),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<FrequencyController>(FrequencyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
