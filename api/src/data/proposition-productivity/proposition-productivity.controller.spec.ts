import { Test, TestingModule } from '@nestjs/testing';
import { PropositionProductivityController } from './proposition-productivity.controller';
import { PropositionProductivityService } from './proposition-productivity.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PropositionProductivity } from './entities/proposition-productivity.entity';
import { Repository } from 'typeorm';

describe('PropositionProductivityController', () => {
  let controller: PropositionProductivityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PropositionProductivityController],
      providers: [
        PropositionProductivityService,
        {
          provide: getRepositoryToken(PropositionProductivity),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<PropositionProductivityController>(
      PropositionProductivityController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
