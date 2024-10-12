import { Test, TestingModule } from '@nestjs/testing';
import { PropositionController } from './proposition.controller';
import { PropositionService } from './proposition.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Proposition } from './entities/proposition.entity';
import { Repository } from 'typeorm';

describe('PropositionController', () => {
  let controller: PropositionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PropositionController],
      providers: [
        PropositionService,
        {
          provide: getRepositoryToken(Proposition),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<PropositionController>(PropositionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
